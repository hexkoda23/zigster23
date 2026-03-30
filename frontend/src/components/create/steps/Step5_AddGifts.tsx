"use client";

import React, { useState } from "react";
import { Plus, Search, Link as LinkIcon, ShoppingBag } from "lucide-react";

export default function Step5_AddGifts({
    onComplete
}: {
    onComplete: () => void
}) {
    const [url, setUrl] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [addedGifts, setAddedGifts] = useState<any[]>([]);

    // Cash Fund State
    const [fundName, setFundName] = useState("");
    const [fundTarget, setFundTarget] = useState("");
    const [addedFunds, setAddedFunds] = useState<any[]>([]);

    const quickPicks = [
        { name: "Samsung 65' TV", store: "SLOT", price: "₦850,000" },
        { name: "Velvet Sofa", store: "DEKOR", price: "₦450,000" },
        { name: "Baby Monitor", store: "JUMIA", price: "₦75,000" },
        { name: "Kitchen Mixer", store: "TEMU", price: "₦320,000" }
    ];

    const handleAdd = async () => {
        if (!url) return;
        setIsAdding(true);

        try {
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });

            if (response.ok) {
                const data = await response.json();

                const newGift = {
                    id: Date.now(),
                    name: data.name || "Product from Link",
                    store: data.store || "EXTERNAL STORE",
                    price: data.price || "Price Unavailable",
                    image: data.image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
                    url: url
                };

                setAddedGifts(prev => [newGift, ...prev]);
                setUrl("");
            } else {
                console.error("Failed to fetch product details");
                // Fallback if scraping fails
                const newGift = {
                    id: Date.now(),
                    name: "Product from Link",
                    store: "EXTERNAL STORE",
                    price: "Price Unavailable",
                    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
                    url: url
                };
                setAddedGifts(prev => [newGift, ...prev]);
                setUrl("");
            }
        } catch (error) {
            console.error("Error adding gift:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const removeGift = (id: number) => {
        setAddedGifts(prev => prev.filter(g => g.id !== id));
    };

    const handleAddFund = () => {
        if (!fundName || !fundTarget) return;

        const newFund = {
            id: Date.now(),
            title: fundName,
            target: fundTarget,
            raised: "₦0",
            contributors: 0,
            icon: "Wallet" // We'll map this string to an icon component when rendering
        };

        setAddedFunds(prev => [newFund, ...prev]);
        setFundName("");
        setFundTarget("");
    };

    const removeFund = (id: number) => {
        setAddedFunds(prev => prev.filter(f => f.id !== id));
    };

    const handleComplete = () => {
        // Save gifts
        if (addedGifts.length > 0) {
            const existingGifts = JSON.parse(localStorage.getItem("zigster_gifts") || "[]");
            localStorage.setItem("zigster_gifts", JSON.stringify([...existingGifts, ...addedGifts]));
        }

        // Save funds
        if (addedFunds.length > 0) {
            const existingFunds = JSON.parse(localStorage.getItem("zigster_funds") || "[]");
            localStorage.setItem("zigster_funds", JSON.stringify([...existingFunds, ...addedFunds]));
        }

        onComplete();
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-primary italic">FINAL STEP</h2>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight uppercase">ADD YOUR FIRST GIFTS</h3>
                <p className="text-muted-foreground font-sans text-[10px] uppercase tracking-[0.4em]">PASTE A LINK OR CHOOSE FROM OUR POPULAR PICKS.</p>
            </div>

            <div className="space-y-12">
                {/* URL Input */}
                <div className="glass p-10 border-primary/20 flex flex-col md:flex-row gap-6 items-end shadow-sm">
                    <div className="flex-1 space-y-4">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em] block">Paste Product URL</label>
                        <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <LinkIcon size={16} />
                            </div>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="HTTPS://WWW.JUMIA.COM.NG/PRODUCT-URL"
                                className="w-full bg-white border border-border pl-14 pr-6 py-5 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={!url || isAdding}
                        className="bg-primary text-foreground px-10 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-md"
                    >
                        {isAdding ? "FETCHING..." : "ADD GIFT"}
                    </button>
                </div>

                {/* Added Gifts Section */}
                {addedGifts.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">YOUR REGISTRY GIFTS</label>
                            <div className="h-[1px] flex-1 bg-border mx-6"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {addedGifts.map((gift) => (
                                <div key={gift.id} className="relative bg-white p-6 border border-border group rounded-sm shadow-sm flex flex-col">
                                    <button
                                        onClick={() => removeGift(gift.id)}
                                        className="absolute top-2 right-2 w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
                                    >
                                        ×
                                    </button>
                                    <div className="aspect-square bg-secondary/30 mb-6 flex items-center justify-center overflow-hidden">
                                        {gift.image ? (
                                            <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag size={40} className="text-primary/10" strokeWidth={1} />
                                        )}
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <div className="text-[9px] font-bold text-primary uppercase tracking-widest">{gift.store}</div>
                                        <h4 className="text-sm font-serif font-bold text-foreground tracking-tight uppercase line-clamp-2">{gift.name}</h4>
                                        <div className="text-lg font-serif font-bold text-foreground">{gift.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fund Input */}
                <div className="glass p-10 border-primary/20 flex flex-col md:flex-row gap-6 items-end shadow-sm bg-primary/[0.02]">
                    <div className="flex-[2] space-y-4">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em] block">Start a Cash Fund</label>
                        <input
                            type="text"
                            value={fundName}
                            onChange={(e) => setFundName(e.target.value)}
                            placeholder="E.G. HONEYMOON IN BALI"
                            className="w-full bg-white border border-border px-6 py-5 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em] block opacity-0">Target</label>
                        <input
                            type="text"
                            value={fundTarget}
                            onChange={(e) => setFundTarget(e.target.value)}
                            placeholder="TARGET (₦)"
                            className="w-full bg-white border border-border px-6 py-5 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                        />
                    </div>
                    <button
                        onClick={handleAddFund}
                        disabled={!fundName || !fundTarget}
                        className="bg-primary text-foreground px-10 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-md"
                    >
                        ADD FUND
                    </button>
                </div>

                {/* Added Funds Section */}
                {addedFunds.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">YOUR CASH FUNDS</label>
                            <div className="h-[1px] flex-1 bg-border mx-6"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {addedFunds.map((fund) => (
                                <div key={fund.id} className="relative bg-white p-6 border border-primary/20 group rounded-sm shadow-sm flex flex-col items-center text-center space-y-4">
                                    <button
                                        onClick={() => removeFund(fund.id)}
                                        className="absolute top-2 right-2 w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
                                    >
                                        ×
                                    </button>
                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                        <Plus size={24} />
                                    </div>
                                    <div className="space-y-1 w-full">
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">FUND TITLE</div>
                                        <h4 className="text-sm font-serif font-bold text-foreground tracking-tight uppercase truncate">{fund.title}</h4>
                                    </div>
                                    <div className="space-y-1 w-full bg-secondary/30 p-2">
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">TARGET</div>
                                        <div className="text-sm font-serif font-bold text-primary">{fund.target}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Picks */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">POPULAR IN NIGERIA</label>
                        <div className="h-[1px] flex-1 bg-border mx-6"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickPicks.map((pick, i) => (
                            <div key={i} className="bg-white p-6 border border-border group hover:border-primary/30 transition-all duration-500 rounded-sm shadow-sm">
                                <div className="aspect-square bg-secondary/30 mb-6 flex items-center justify-center text-primary/10 group-hover:text-primary transition-colors">
                                    <ShoppingBag size={40} strokeWidth={1} />
                                </div>
                                <div className="space-y-3">
                                    <div className="text-[9px] font-bold text-primary uppercase tracking-widest">{pick.store}</div>
                                    <h4 className="text-sm font-serif font-bold text-foreground tracking-tight uppercase group-hover:text-primary transition-colors">{pick.name}</h4>
                                    <div className="text-lg font-serif font-bold text-foreground">{pick.price}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setAddedGifts(prev => [{ ...pick, id: Date.now() }, ...prev]);
                                    }}
                                    className="w-full mt-6 border border-border py-3 text-[9px] font-bold text-muted-foreground uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
                                >
                                    ADD TO REGISTRY
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-12 text-center">
                    <button
                        onClick={handleComplete}
                        className="bg-primary text-foreground px-16 py-6 font-sans font-bold text-sm uppercase tracking-[0.4em] hover:bg-foreground hover:text-white transition-all duration-500 shadow-lg shadow-primary/20"
                    >
                        FINISH & VIEW DASHBOARD →
                    </button>
                </div>
            </div>
        </div>
    );
}
