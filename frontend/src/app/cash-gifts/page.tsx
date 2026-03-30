"use client";

import React from "react";
import { Wallet, ShieldCheck, Zap, ArrowRight, Banknote, Palmtree, Home, GraduationCap, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";

const FundStep = ({ number, title, text }: any) => (
    <div className="flex gap-8 items-start group">
        <div className="text-4xl font-serif font-bold text-white/10 group-hover:text-gold transition-colors duration-500">
            {number}
        </div>
        <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{text}</p>
        </div>
    </div>
);

const FundUseBox = ({ icon: Icon, title, desc }: any) => (
    <div className="glass p-8 border-white/5 space-y-6 group hover:border-gold/30 transition-all duration-500 text-center">
        <div className="w-16 h-16 bg-gold/5 flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-sm">
            <Icon size={32} strokeWidth={1} />
        </div>
        <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-tight">{title}</h4>
            <p className="text-[9px] text-muted-foreground uppercase leading-relaxed tracking-widest">{desc}</p>
        </div>
    </div>
);

export default function CashGiftsPage() {
    return (
        <main className="bg-[#080808] text-white pt-32 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 space-y-32">

                {/* Split Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div className="section-label inline-block">Direct Contributions</div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none uppercase">
                            CASH <br />
                            <span className="text-gold italic">FUNDS.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-serif italic max-w-xl leading-relaxed">
                            "Empower your guests to contribute toward your biggest life goals. Secure, fast, and built for Nigeria."
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-xl shadow-gold/20">
                                START A FUND
                            </button>
                            <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-background transition-all">
                                LEARN MORE
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute -inset-20 bg-gold/5 blur-[120px] rounded-full z-0"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10 glass p-10 border-gold/20 bg-gold/[0.02] space-y-12 shadow-2xl"
                        >
                            <div className="flex justify-between items-center bg-white/5 p-6 border border-white/5">
                                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Honeymoon Fund</p>
                                <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                            </div>
                            <div className="space-y-2 text-center">
                                <p className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter">₦2.4M</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">OF ₦5M TARGET RAISED</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gold w-[48%]"></div>
                                </div>
                                <div className="flex justify-between text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]">
                                    <span>28 CONTRIBUTORS</span>
                                    <span>48% FUNDED</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-white/5 py-4 border border-white/5 text-center">
                                    <ShieldCheck className="text-gold mx-auto mb-2" size={20} />
                                    <p className="text-[8px] font-bold text-white uppercase tracking-widest">Paystack Verified</p>
                                </div>
                                <div className="flex-1 bg-white/5 py-4 border border-white/5 text-center">
                                    <Zap className="text-gold mx-auto mb-2" size={20} />
                                    <p className="text-[8px] font-bold text-white uppercase tracking-widest">Instant Pay</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="space-y-24">
                    <div className="text-center space-y-4">
                        <div className="section-label inline-block">The Process</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-tight">EASY. SECURE. <span className="text-gold italic">FAST.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <FundStep
                            number="01"
                            title="Create your fund"
                            text="Choose a goal like a honeymoon, home deposit, or education fund."
                        />
                        <FundStep
                            number="02"
                            title="Share with guests"
                            text="Friends and family contribute any amount they like via single-click secure payment."
                        />
                        <FundStep
                            number="03"
                            title="Withdraw instantly"
                            text="Funds are settled directly into your Nigerian bank account with full tracking."
                        />
                    </div>
                </div>

                {/* Categories Section */}
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                        <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Popular Fund <span className="text-gold italic">Types.</span></h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">WHAT NIGERIANS ARE RAISING FOR.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FundUseBox icon={Palmtree} title="Honeymoon" desc="Raise money for that dream vacation to the Maldives or Dubai." />
                        <FundUseBox icon={Home} title="Home Deposit" desc="Get closer to your first home in Lagos, Abuja or PH." />
                        <FundUseBox icon={GraduationCap} title="Education" desc="Support your next degree or your children's future studies." />
                        <FundUseBox icon={Heart} title="Charity" desc="Encourage guests to give back to your favorite NGO or cause." />
                    </div>
                </div>

                {/* Security / Partner row */}
                <div className="bg-secondary/30 border border-white/5 p-12 lg:p-20 text-center space-y-12">
                    <div className="space-y-4">
                        <ShieldCheck className="text-gold mx-auto" size={48} strokeWidth={1} />
                        <h4 className="text-2xl font-serif font-bold text-white uppercase tracking-tight leading-tight">WORLD-CLASS SECURITY. LOCAL PAYMENTS.</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                            WE PARTNER WITH NIGERIA'S BEST PAYMENT GATEWAYS TO ENSURE EVERY KOBO IS ACCOUNTED FOR AND EVERY TRANSACTION IS ENCRYPTED.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 contrast-125">
                        <span className="text-xl font-sans font-black italic tracking-tighter">PAYSTACK</span>
                        <span className="text-xl font-sans font-black italic tracking-tighter">FLUTTERWAVE</span>
                        <span className="text-xl font-sans font-black italic tracking-tighter">PROVIDUS</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
