const cheerio = require("cheerio");

async function checkKonga() {
    const url = "https://www.konga.com/product/starlink-starlink-standard-kit-v4-gen-3-6897283";
    const res = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // See what's in application/ld+json
    $('script[type="application/ld+json"]').each((i, el) => {
        console.log("LD+JSON:", $(el).html());
    });

    // See if there's a specific Konga price class
    // Often it's in something like div.price or span.price
    console.log("All text containing ₦:", html.split('₦')
        .map(s => s.substring(0, 20))
        .filter(s => s.match(/^\s*[\d,]+/))
        .slice(0, 10));
}
checkKonga().catch(console.error);
