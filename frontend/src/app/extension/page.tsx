"use client";

import React from "react";
import { Chrome, Zap, ShieldCheck, Globe, Download, ArrowRight, MousePointer2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const FeaturePoint = ({ icon: Icon, title, text }: any) => (
    <div className="flex gap-6 items-start">
        <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold shrink-0 rounded-sm">
            <Icon size={20} />
        </div>
        <div className="space-y-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-widest">{text}</p>
        </div>
    </div>
);

export default function ExtensionPage() {
    return (
        <main className="min-h-screen bg-[#080808] text-white pt-32 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                {/* Left Side: Content */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="section-label inline-block">Universal Add Button</div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none uppercase">
                            ANY STORE. <br />
                            <span className="text-gold italic">ONE CLICK.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-serif leading-relaxed italic max-w-xl">
                            "Add items to your Zigister 23 registry from Jumia, Konga, Amazon, or ANY website on the planet. No more manual entry."
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FeaturePoint
                            icon={Zap}
                            title="Instant Import"
                            text="Our AI extracts price, photo, and details automatically as you browse."
                        />
                        <FeaturePoint
                            icon={Globe}
                            title="Global Compatibility"
                            text="Works on every store from Lagos to London, Dubai to New York."
                        />
                        <FeaturePoint
                            icon={ShieldCheck}
                            title="Safe & Secure"
                            text="Verified extension by Google Chrome. We never see your payment data."
                        />
                        <FeaturePoint
                            icon={MousePointer2}
                            title="Seamless Sync"
                            text="One click adds items directly to your active wedding or baby registry."
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold/20 flex items-center justify-center gap-4">
                            <Chrome size={20} /> INSTALL FOR CHROME
                        </button>
                        <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-background transition-all duration-500 flex items-center justify-center gap-4">
                            <Download size={20} /> SAFARI & EDGE
                        </button>
                    </div>

                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        OVER 10,000 NIGERIANS USE THE Z23 EXTENSION DAILY.
                    </p>
                </div>

                {/* Right Side: Mockup / Visual */}
                <div className="relative">
                    <div className="absolute -inset-20 bg-gold/5 blur-[120px] rounded-full z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 glass p-4 border-white/5 rounded-sm shadow-2xl"
                    >
                        <div className="bg-[#111] p-4 border-b border-white/5 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <div className="flex-1 bg-white/5 h-6 rounded-sm px-4 flex items-center">
                                <span className="text-[8px] text-white/20 uppercase tracking-widest">https://www.jumia.com.ng/electronics/samsung-tv</span>
                            </div>
                        </div>

                        <div className="relative aspect-video bg-background overflow-hidden p-8 flex items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200"
                                alt="Store Interface"
                                className="w-full h-full object-cover opacity-20 grayscale"
                            />

                            {/* Floating Extension UI */}
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute top-12 right-12 w-80 glass border-gold/30 p-8 shadow-2xl shadow-black bg-[#111]"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xl font-serif font-bold text-white uppercase tracking-tight">Z23</span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Product Detected</p>
                                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">SAMSUNG CRYSTAL UHD TV</h4>
                                        <p className="text-lg font-serif font-bold text-white/50">₦850,000</p>
                                    </div>

                                    <div className="h-[1px] bg-white/5"></div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Add to Registry</p>
                                        <div className="bg-secondary p-3 border border-white/10 flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Added to Registry</span>
                                            <ArrowRight size={12} className="text-gold" />
                                        </div>
                                    </div>

                                    <button className="w-full bg-gold text-background py-4 font-sans font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-gold/10">
                                        ADD TO REGISTRY →
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Floating Icons */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-10 -right-10 w-20 h-20 glass border-gold/20 flex items-center justify-center text-gold shadow-xl rotate-12"
                    >
                        <ShoppingBag size={32} strokeWidth={1} />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
