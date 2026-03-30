"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockGifts } from "@/lib/mockData";

const LiveGiftFeed = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const tabs = ["ALL", "WEDDING", "BABY", "BIRTHDAY", "HOUSEWARMING"];

    return (
        <section className="py-24 bg-secondary/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="section-label">Live Gift Feed</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                            SEE WHAT <span className="text-gold">NIGERIANS</span> ARE ADDING.
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-4 border-b border-border pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-bold font-sans uppercase tracking-[0.3em] pb-4 px-2 transition-all relative ${activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-primary"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {mockGifts.map((gift, index) => (
                            <motion.div
                                key={gift.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass p-4 group"
                            >
                                <div className="relative aspect-square mb-6 overflow-hidden rounded-sm">
                                    <img
                                        src={gift.image}
                                        alt={gift.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[9px] font-bold text-primary uppercase tracking-widest">
                                        {gift.store}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-sm font-sans font-bold text-foreground uppercase tracking-wider group-hover:text-primary transition-colors line-clamp-2">
                                            {gift.name}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-xl font-serif font-bold text-foreground">
                                            ₦{gift.price.toLocaleString()}
                                        </div>
                                        <div className="text-[9px] font-bold font-sans text-muted-foreground uppercase tracking-widest italic">
                                            {gift.date}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-16 flex flex-col items-center gap-6">
                    <div className="text-xs font-sans font-bold text-white/30 uppercase tracking-[0.4em]">
                        JOIN 50,000+ NIGERIANS CREATING THEIR DREAM REGISTRY
                    </div>
                    <motion.div
                        className="flex items-center gap-2 group cursor-pointer"
                        whileHover={{ x: 5 }}
                    >
                        <span className="text-sm font-sans font-bold text-gold uppercase tracking-[0.3em]">START ADDING GIFTS</span>
                        <span className="text-gold">→</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LiveGiftFeed;
