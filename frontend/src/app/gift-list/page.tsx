"use client";

import React from "react";
import { Gift, Star, Zap, Share2, ShoppingBag, ArrowRight, Heart, Home, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const OccasionCategory = ({ icon: Icon, title, items }: any) => (
    <div className="glass p-10 border-white/5 space-y-6 group hover:border-gold/30 transition-all duration-500">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-sm">
            <Icon size={20} />
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{items} Items Suggested</p>
        </div>
        <button className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
            BROWSE GUIDE <ArrowRight size={14} />
        </button>
    </div>
);

export default function GiftListPage() {
    return (
        <main className="bg-background text-white pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-6 space-y-32">

                {/* Modern Split Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div className="section-label inline-block">Universal Wishlist</div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none uppercase">
                            FOR EVERY <br />
                            <span className="text-gold italic">OCCASION.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-serif italic max-w-xl leading-relaxed">
                            "Birthdays, graduations, housewarmings, or just because. Create a beautiful list of the things you love and share it with the world."
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold/20">
                                CREATE YOUR LIST
                            </button>
                            <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-background transition-all">
                                EXPLORE GUIDES
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute -inset-20 bg-gold/5 blur-[120px] rounded-full z-0"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10 grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4 pt-12">
                                <div className="aspect-square glass border-white/10 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1549463591-147604343a30?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-40" />
                                </div>
                                <div className="aspect-[3/4] glass border-gold/20 overflow-hidden bg-gold/5 flex flex-col justify-center p-8 text-center space-y-4">
                                    <Star className="text-gold mx-auto" />
                                    <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Hottest Pick</p>
                                    <h4 className="text-sm font-serif font-bold text-white uppercase tracking-tight">DYSON AIRWRAP</h4>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-[4/5] glass border-white/10 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-40" />
                                </div>
                                <div className="aspect-square glass border-white/10 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-40" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Occasions Grid */}
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-serif font-bold text-white uppercase tracking-tight">WHY STOP AT <span className="text-gold italic">WEDDINGS?</span></h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.3em]">CURATED GUIDES FOR EVERY MILESTONE.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <OccasionCategory icon={Star} title="Birthdays" items={124} />
                        <OccasionCategory icon={Home} title="Housewarming" items={85} />
                        <OccasionCategory icon={GraduationCap} title="Graduation" items={42} />
                        <OccasionCategory icon={Heart} title="Anniversary" items={68} />
                    </div>
                </div>

                {/* Feature Row */}
                <div className="bg-secondary/30 border-y border-white/5 py-24">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <Zap className="text-gold" />
                            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">Instant Creation</h3>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">Build a beautiful wishlist in under 3 minutes.</p>
                        </div>
                        <div className="space-y-4">
                            <Share2 className="text-gold" />
                            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">Easy Sharing</h3>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">Share one link on WhatsApp, IG, or Twitter Bio.</p>
                        </div>
                        <div className="space-y-4">
                            <ShoppingBag className="text-gold" />
                            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">Any Store</h3>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">Add items from Jumia, Slot, or local IG vendors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
