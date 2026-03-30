"use client";

import React from "react";
import { Heart, ShieldCheck, Globe, Users, ArrowRight, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

const ImpactCard = ({ icon: Icon, title, text }: any) => (
    <div className="glass p-10 border-white/5 space-y-6 group hover:border-gold/30 transition-all duration-500">
        <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-background transition-all duration-500 rounded-sm">
            <Icon size={20} />
        </div>
        <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{text}</p>
        </div>
    </div>
);

export default function NonprofitPage() {
    return (
        <main className="bg-[#080808] text-white pt-32 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                {/* Left Side: Content */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="section-label inline-block">Registry for Good</div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none uppercase">
                            GIVE <br />
                            <span className="text-emerald-500 italic">BACK.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-serif leading-relaxed italic max-w-xl">
                            "Powering Nigerian non-profits and charities. Create a registry for your cause and let supporters donate items or cash directly."
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ImpactCard
                            icon={Target}
                            title="Direct Impact"
                            text="Donors purchase the exact items your charity needs, from medical supplies to school books."
                        />
                        <ImpactCard
                            icon={ShieldCheck}
                            title="Verified NGOs"
                            text="We prioritize CAC-registered organizations for maximum transparency and trust."
                        />
                        <ImpactCard
                            icon={Zap}
                            title="Zero Fees"
                            text="Special pricing for non-profits to ensure 100% of the impact goes where it's needed."
                        />
                        <ImpactCard
                            icon={Users}
                            title="Social Sharing"
                            text="Built-in tools to spread your cause on WhatsApp, Instagram, and Twitter."
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <button className="bg-emerald-600 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-emerald-600 transition-all duration-500 shadow-xl shadow-emerald-600/20">
                            REGISTER YOUR CHARITY
                        </button>
                        <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-background transition-all">
                            EXPLORE CAUSES
                        </button>
                    </div>
                </div>

                {/* Right Side: Visual */}
                <div className="relative">
                    <div className="absolute -inset-20 bg-emerald-500/5 blur-[120px] rounded-full z-0"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative z-10 glass border-white/5 overflow-hidden shadow-2xl aspect-[4/5] flex items-center justify-center p-12 bg-secondary/20"
                    >
                        <div className="space-y-12 text-center">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <Heart size={48} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight italic">Giving is Luxury.</h3>
                                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.4em] max-w-xs mx-auto">
                                    JOIN OVER 500 NIGERIAN ORGANIZATIONS ALREADY USING Z23 FOR GOOD.
                                </p>
                            </div>
                            <div className="pt-12 grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-6 border border-white/10">
                                    <p className="text-2xl font-serif font-bold text-white">₦45M+</p>
                                    <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-2">RAISED FOR CAUSES</p>
                                </div>
                                <div className="bg-white/5 p-6 border border-white/10">
                                    <p className="text-2xl font-serif font-bold text-white">12K+</p>
                                    <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-2">ITEMS DONATED</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
