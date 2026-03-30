"use client";

import React, { useState } from "react";
import { ShoppingBag, Search, ExternalLink, Filter, ArrowRight, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const StoreCard = ({ name, category, logo, description, itemsAdded }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 border-white/5 group hover:border-gold/30 transition-all duration-500 flex flex-col justify-between h-full"
    >
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-sm italic font-serif font-bold text-xl uppercase tracking-tighter">
                    {name[0]}
                </div>
                <div className="bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20 flex items-center gap-1.5">
                    <Zap size={10} className="text-emerald-500" />
                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Auto-Fetch</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif font-bold text-white uppercase tracking-tight">{name}</h3>
                    <span className="text-[9px] font-bold text-gold uppercase tracking-widest bg-gold/5 px-2 py-1 border border-gold/10">{category}</span>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-widest line-clamp-2">
                    {description}
                </p>
            </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="space-y-1">
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">REGISTRY SYNC</p>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">{itemsAdded} ITEMS ADDED TODAY</p>
            </div>
            <button className="text-gold hover:text-white transition-colors">
                <ExternalLink size={18} />
            </button>
        </div>
    </motion.div>
);

const stores = [
    { name: "Jumia", category: "General", itemsAdded: "2.4k", description: "Nigeria's largest online mall for electronics, fashion, and home goods." },
    { name: "Konga", category: "General", itemsAdded: "1.8k", description: "Premium online shopping destination for home decor and baby essentials." },
    { name: "Slot", category: "Tech", itemsAdded: "950", description: "Nigeria's leading retail chain for phones, tablets, and smart devices." },
    { name: "Jiji", category: "Market", itemsAdded: "4.2k", description: "The largest classifieds site in Nigeria for unique and local finds." },
    { name: "Temu", category: "Global", itemsAdded: "3.1k", description: "Discover affordable global products with direct shipping to Nigeria." },
    { name: "Dekor NG", category: "Home", itemsAdded: "120", description: "Curated luxury furniture and home accessories for the modern Nigerian home." },
    { name: "Amazon", category: "Global", itemsAdded: "800", description: "Shop millions of global items and add them to your local registry." },
    { name: "Scanfrost", category: "Appliances", itemsAdded: "250", description: "Quality home appliances from refrigerators to washing machines." },
    { name: "Baby Bliss", category: "Baby", itemsAdded: "180", description: "The ultimate destination for all your mother and baby needs in Nigeria." },
];

export default function StoresPage() {
    const [filter, setFilter] = useState("all");

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 space-y-24">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="section-label">Partner Network</div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight uppercase">
                            SHOP ANY <span className="text-gold italic">STORE.</span>
                        </h1>
                        <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.3em] leading-relaxed">
                            ZIGISTER 23 INTEGRATES WITH EVERY MAJOR NIGERIAN AND INTERNATIONAL RETAILER. BROWSE OUR SUGGESTED PARTNERS OR ADD FROM ANY SITE.
                        </p>
                    </div>

                    <div className="w-full lg:w-96 glass p-2 border-white/10 flex items-center px-6 gap-4 bg-secondary">
                        <Search size={18} className="text-gold" />
                        <input
                            type="text"
                            placeholder="SEARCH STORES..."
                            className="w-full py-4 bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.3em] text-white"
                        />
                    </div>
                </div>

                {/* Global Stores Banner */}
                <div className="bg-gold/5 border border-gold/20 p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3 text-gold">
                            <Globe size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">International Shopping Available</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight">
                            SHOP GLOBAL. SHIP <span className="text-gold italic">LOCAL.</span>
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-xl leading-relaxed">
                            ADD ITEMS FROM AMAZON, MACY'S, OR HARRODS. WE HANDLE THE COMPLEX LOGISTICS OF INTERNATIONAL DELIVERY TO NIGERIA.
                        </p>
                    </div>
                    <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold/10 relative z-10 shrink-0">
                        LEARN MORE →
                    </button>
                </div>

                {/* Filter & Grid */}
                <div className="space-y-12">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                        {["all", "general", "tech", "home", "baby", "global"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-4 text-[9px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap ${filter === cat ? "bg-gold text-background shadow-lg" : "text-muted-foreground hover:text-white border border-white/5 hover:border-white/20"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stores.filter(s => filter === "all" || s.category.toLowerCase() === filter).map((store, i) => (
                            <StoreCard key={i} {...store} />
                        ))}
                    </div>
                </div>

                {/* CTA Footer */}
                <div className="text-center pt-12 space-y-10">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">CAN'T FIND YOUR FAVORITE STORE?</p>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <button className="border border-white/10 text-white px-10 py-5 font-sans font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-background transition-all">
                            REQUEST STORE INTEGRATION
                        </button>
                        <button className="border border-gold/30 text-gold px-10 py-5 font-sans font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-background transition-all">
                            USE BROWSER EXTENSION
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
