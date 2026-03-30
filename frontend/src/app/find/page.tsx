"use client";

import React, { useState } from "react";
import { Search, Calendar, MapPin, ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";

const RegistryResultCard = ({ name, type, date, location }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 border-white/5 group hover:border-gold/30 transition-all duration-500 cursor-pointer flex flex-col md:flex-row justify-between items-center gap-8"
    >
        <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-secondary flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-sm">
                <User size={24} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">{name}</h3>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-gold" /> {date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-gold" /> {location}</span>
                    <span className="text-gold/60">{type}</span>
                </div>
            </div>
        </div>
        <button className="bg-white/5 border border-white/10 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.3em] group-hover:bg-gold group-hover:text-background transition-all duration-500 flex items-center gap-3">
            VIEW REGISTRY <ArrowRight size={14} />
        </button>
    </motion.div>
);

export default function FindRegistryPage() {
    const [search, setSearch] = useState("");

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 space-y-20">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="section-label inline-block">Guest Portal</div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight uppercase">
                        FIND A <span className="text-gold italic">REGISTRY.</span>
                    </h1>
                    <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.3em] max-w-2xl mx-auto">
                        SEARCH BY NAME OR EVENT DATE TO FIND YOUR FRIENDS AND FAMILY.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="glass p-2 border-white/10 shadow-2xl shadow-gold/5 max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-6 gap-4 bg-secondary">
                        <Search size={20} className="text-gold" />
                        <input
                            type="text"
                            placeholder="ENTER FIRST OR LAST NAME..."
                            className="w-full py-6 bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest text-white placeholder:text-white/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-500">
                        SEARCH
                    </button>
                </div>

                {/* Results / Empty State */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em]">Suggested Registries</h2>
                        <p className="text-[10px] font-bold text-gold uppercase tracking-widest">3 RESULTS FOUND</p>
                    </div>

                    <div className="space-y-4">
                        <RegistryResultCard
                            name="Your Registry Name"
                            type="Wedding Registry"
                            date="Oct 12, 2026"
                            location="Lagos, Nigeria"
                        />
                        <RegistryResultCard
                            name="Kemi's Baby Shower"
                            type="Baby Registry"
                            date="Nov 05, 2026"
                            location="Abuja, Nigeria"
                        />
                        <RegistryResultCard
                            name="Chidi's New Home"
                            type="Housewarming"
                            date="Dec 20, 2026"
                            location="Enugu, Nigeria"
                        />
                    </div>
                </div>

                {/* Help box */}
                <div className="bg-secondary/50 border border-white/5 p-12 text-center space-y-6">
                    <h3 className="text-sm font-serif font-bold text-white uppercase tracking-widest">CAN'T FIND WHO YOU'RE LOOKING FOR?</h3>
                    <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-widest max-w-lg mx-auto">
                        Try searching with just a last name or event month. If the registry is set to 'Link Only', you'll need the direct URL from the registry owner.
                    </p>
                    <button className="text-gold hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                        CONTACT SUPPORT
                    </button>
                </div>
            </div>
        </main>
    );
}
