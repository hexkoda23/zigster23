const cheerio = require("cheerio");

async function checkKonga() {
    const url = "https://www.konga.com/product/starlink-starlink-standard-kit-v4-gen-3-6897283";
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Look for __NEXT_DATA__
    console.log("NEXT_DATA exist:", $('#__NEXT_DATA__').length);

    // Check script contents for price
    $('script').each((i, el) => {
        const text = $(el).html();
        if (text && text.includes('6897283') && text.includes('price')) {
            const match = text.match(/"price"\s*:\s*(\d+)/);
            if (match) console.log("Found price in script:", match[0]);
            const match2 = text.match(/"special_price"\s*:\s*(\d+)/);
            if (match2) console.log("Found special_price in script:", match2[0]);
        }
    });
}
checkKonga().catch(console.error);
