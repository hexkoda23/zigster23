"use client";

import React from "react";

const StoreMarquee = () => {
    const stores = [
        "JUMIA", "KONGA", "JIJI", "ZARA NG", "H&M NG", "SHOPRITE", "THE PALMS", "PAYPORTE",
        "FASHION NOVA", "VEEKEE JAMES", "MAI ATAFO", "LISA FOLAWIYO", "TURAI", "HOUSE OF LUNETTES",
        "ẸGÁ", "LEKKI MARKET", "BUMIA", "MINISO", "GAME STORES", "SLOT NG", "TEMU", "SHEIN",
        "ALIEXPRESS", "AMAZON", "ASOS", "NEXT", "FARFETCH", "SKIN REPUBLIC", "L'ORÉAL",
        "SLEEK", "GLAMOURGALS", "BM PRO", "HOUSE OF TARA", "DEKOR", "HOMZMART", "HOMESENSE", "RUFF 'N' TUMBLE"
    ];

    // Double the array for infinite scroll effect
    const doubledStores = [...stores, ...stores];

    return (
        <section className="py-20 bg-background border-y border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="section-label">Partner Brands</div>
            </div>

            <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10"></div>

                <div className="animate-marquee whitespace-nowrap">
                    {doubledStores.map((store, index) => (
                        <div
                            key={`${store}-${index}`}
                            className="inline-block px-12 text-3xl md:text-5xl font-serif font-bold text-foreground/10 hover:text-primary transition-colors duration-500 cursor-default"
                        >
                            {store}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoreMarquee;
