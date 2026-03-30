"use client";

import React from "react";
import { Heart, Baby, Sparkles, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BabyFeature = ({ icon: Icon, title, text }: any) => (
    <div className="flex gap-6 items-start py-10 border-b border-white/5 last:border-0 group">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-gold group-hover:bg-white/10 transition-all duration-500 rounded-sm shrink-0">
            <Icon size={20} />
        </div>
        <div className="space-y-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{text}</p>
        </div>
    </div>
);

export default function BabyPage() {
    return (
        <main className="bg-background text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                {/* Left Side: Content */}
                <div className="relative z-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="section-label inline-block">New Beginnings</div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none uppercase">
                            TENDER <br />
                            <span className="text-gold italic">LUXURY.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-serif leading-relaxed italic max-w-xl">
                            "The most comprehensive baby registry for Nigeria. From local baby shops to global essentials, we've got you and your bundle of joy covered."
                        </p>
                    </motion.div>

                    <div className="space-y-2">
                        <BabyFeature
                            icon={Baby}
                            title="Verified Essentials"
                            text="Curated lists of top-rated baby gear from Nigerian and international brands."
                        />
                        <FeatureWithIcon icon={ShieldCheck} title="Naira Support" text="No conversion fees. Everything in Naira, synced across all stores." />
                        <FeatureWithIcon icon={ShoppingBag} title="Group Gifting" text="Let friends and family contribute toward larger items like cribs and strollers." />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold/20">
                            CREATE BABY REGISTRY
                        </button>
                        <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-background transition-all duration-500">
                            FIND A SHOWER
                        </button>
                    </div>
                </div>

                {/* Right Side: Visual */}
                <div className="relative">
                    <div className="absolute -inset-20 bg-gold/5 blur-[120px] rounded-full z-0"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative z-10 glass border-white/5 overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=1200"
                            alt="Baby Registry Inspiration"
                            className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute bottom-8 left-8 right-8 p-8 glass border-gold/20 bg-[#0c0c0c]/80 backdrop-blur-md">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Must Have</p>
                                    <h4 className="text-sm font-serif font-bold text-white uppercase tracking-tight">PHILIPS AVENT MONITOR</h4>
                                </div>
                                <ArrowRight className="text-gold" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

const FeatureWithIcon = ({ icon: Icon, title, text }: any) => (
    <div className="flex gap-6 items-start py-10 border-b border-white/5 last:border-0 group">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-gold group-hover:bg-white/10 transition-all duration-500 rounded-sm shrink-0">
            <Icon size={20} />
        </div>
        <div className="space-y-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{text}</p>
        </div>
    </div>
);
