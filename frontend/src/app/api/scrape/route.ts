import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Extracts a human-readable product name from a Jumia-style URL slug
// e.g. "itel-a70-6.6-hd-display-128gb-rom-4gb" → "Itel A70 6.6 Hd Display 128Gb Rom 4Gb"
function nameFromSlug(url: string): string {
    const urlObj = new URL(url);
    let slug = urlObj.pathname.split("/").pop() || "";
    // Remove .html extension
    slug = slug.replace(/\.html$/, "");
    // Remove trailing product ID (digits at end often preceded by a dash)
    slug = slug.replace(/-\d{6,}$/, "");
    // Remove common store suffixes like -gift, -black, -white etc. in very last position
    // Actually let's keep those
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
        .slice(0, 120);
}

// Helper: fetch with timeout and browser headers
async function fetchWithTimeout(url: string, ms = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);
    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Referer": "https://www.google.com/",
            },
            redirect: "follow",
        });
        clearTimeout(timeout);
        return res;
    } catch (e) {
        clearTimeout(timeout);
        throw e;
    }
}

function extractProduct($: cheerio.CheerioAPI, html: string, url: string): { name: string; price: string; image: string; store: string } {
    const hostname = new URL(url).hostname.toLowerCase();
    let name = "";
    let price = "";
    let image = "";
    let store = "EXTERNAL STORE";

    if (hostname.includes("jumia")) store = "JUMIA";
    else if (hostname.includes("konga")) store = "KONGA";
    else if (hostname.includes("jiji")) store = "JIJI";
    else if (hostname.includes("temu")) store = "TEMU";
    else if (hostname.includes("amazon")) store = "AMAZON";
    else if (hostname.includes("aliexpress")) store = "ALIEXPRESS";
    else if (hostname.includes("zara")) store = "ZARA";
    else if (hostname.includes("shein")) store = "SHEIN";

    // ── 1. JSON-LD Product data ──────────────────────────────────────────────
    $('script[type="application/ld+json"]').each((_i, el) => {
        try {
            const parsed = JSON.parse($(el).html() || "{}");
            const nodes = Array.isArray(parsed) ? parsed : [parsed];
            const product = nodes.find((n: any) => n?.["@type"] === "Product");
            if (product) {
                if (!name && product.name) name = product.name;
                if (!image && product.image) {
                    image = Array.isArray(product.image) ? product.image[0] : product.image;
                }
                if (!price && product.offers) {
                    const offers = Array.isArray(product.offers) ? product.offers[0] : product.offers;
                    if (offers?.price) {
                        const sym = offers.priceCurrency === "NGN" ? "₦" : (offers.priceCurrency || "");
                        price = `${sym}${Number(offers.price).toLocaleString()}`;
                    }
                }
            }
        } catch (_) { }
    });

    // ── 2. Open Graph fallbacks ──────────────────────────────────────────────
    if (!name) name = $('meta[property="og:title"]').attr("content") || $("h1").first().text().trim() || "";
    if (!image) image = $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || "";

    // ── 2.5 Konga-specific extraction from Next.js state ─────────────────────
    if (!price && store === "KONGA") {
        const nextData = $('#__NEXT_DATA__').html();
        if (nextData) {
            const specialMatch = nextData.match(/"special_price"\s*:\s*(\d+)/);
            const priceMatch = nextData.match(/"price"\s*:\s*(\d+)/);

            let numPrice = 0;
            if (specialMatch && parseInt(specialMatch[1]) > 0) numPrice = parseInt(specialMatch[1]);
            else if (priceMatch) numPrice = parseInt(priceMatch[1]);

            if (numPrice > 0) {
                price = `₦${numPrice.toLocaleString()}`;
            }
        }
    }

    // ── 3. Price via regex on full HTML (most reliable for Jumia when page loads) ──
    if (!price) {
        // Try to find Naira price patterns in HTML — match ₦ followed by a number
        const priceRegex = /₦\s*([\d,]+)/g;
        const matches = [...html.matchAll(priceRegex)];
        // Filter out obviously small values (like ₦5 shipping) — take the largest
        const amounts = matches
            .map((m) => parseInt(m[1].replace(/,/g, ""), 10))
            .filter((n) => n > 500);
        if (amounts.length > 0) {
            const mainPrice = amounts[0]; // first match is usually the main product price
            price = `₦${mainPrice.toLocaleString()}`;
        }
    }

    // ── 4. Jumia-specific image fallback ─────────────────────────────────────
    if (!image && store === "JUMIA") {
        image = $('img[data-src*="jumia.is"]').first().attr("data-src")
            || $('img[src*="jumia.is"]').first().attr("src")
            || $("img").first().attr("src")
            || "";
    }

    // ── 5. URL slug as FINAL name fallback (always works) ───────────────────
    // Only use if the parsed name looks wrong (e.g. it's a category from a redirected page)
    const slugName = nameFromSlug(url);
    // If name is empty OR name doesn't share any significant words with the slug, trust slug
    if (!name || name.toLowerCase().includes("camera cases") || name.split(" ").length < 2) {
        name = slugName;
    }

    // Clean name
    if (name.includes("|")) name = name.split("|")[0].trim();

    return { name, price, image, store };
}

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

        let html = "";

        // Try 1: direct fetch
        try {
            const res = await fetchWithTimeout(url);
            if (res.ok) html = await res.text();
        } catch (_) { }

        // Try 2: allorigins proxy if direct failed
        if (!html) {
            try {
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
                const res = await fetchWithTimeout(proxyUrl);
                if (res.ok) html = await res.text();
            } catch (_) { }
        }

        // Even if we got no HTML, we can still build a card from the URL slug
        const $ = cheerio.load(html || "<html></html>");
        const result = extractProduct($, html, url);

        // If no image found, use a branded placeholder
        if (!result.image) {
            result.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name.slice(0, 2))}&size=400&background=FFE4E1&color=FF1493&bold=true&font-size=0.4`;
        }

        return NextResponse.json({ ...result, url });

    } catch (error: any) {
        console.error("Scraping error:", error);
        return NextResponse.json({ error: "Failed to scrape product", details: error.message }, { status: 500 });
    }
}
