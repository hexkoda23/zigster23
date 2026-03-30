"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode, Smartphone, Apple, ShieldCheck } from "lucide-react";

const DownloadApp = () => {
    return (
        <section className="py-24 bg-background border-y border-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass overflow-hidden rounded-sm relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="p-10 lg:p-20 space-y-10 order-2 lg:order-1">
                            <div className="space-y-6">
                                <div className="section-label group flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Mobile Experience
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
                                    MANAGE YOUR REGISTRY <br />
                                    <span className="text-primary italic">ON THE GO.</span>
                                </h2>
                            </div>

                            <p className="text-lg text-muted-foreground font-sans leading-relaxed tracking-wide max-w-lg">
                                The Zigister 23 app brings all your registry management tools to your pocket.
                                Fast, responsive, and data-efficient for Nigerian users.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-foreground font-sans font-bold text-xs uppercase tracking-widest">
                                        <QrCode size={18} className="text-primary" />
                                        Scan to Download
                                    </div>
                                    <div className="w-32 h-32 bg-white p-2 rounded-sm group cursor-pointer border border-border">
                                        <div className="w-full h-full bg-secondary flex items-center justify-center p-4">
                                            {/* Placeholder for QR Code */}
                                            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full opacity-60">
                                                <div className="bg-gold/20"></div><div className="bg-gold"></div><div className="bg-gold/20"></div>
                                                <div className="bg-gold"></div><div className="bg-gold/40"></div><div className="bg-gold"></div>
                                                <div className="bg-gold/20"></div><div className="bg-gold"></div><div className="bg-gold/20"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 justify-center">
                                    <button className="flex items-center gap-4 bg-primary text-white px-6 py-3 rounded-sm font-sans font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-all duration-500 w-full sm:w-auto">
                                        <Apple size={20} />
                                        <span>App Store</span>
                                    </button>
                                    <button className="flex items-center gap-4 border border-primary/20 text-foreground px-6 py-3 rounded-sm font-sans font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all duration-500 w-full sm:w-auto">
                                        <Smartphone size={20} />
                                        <span>Google Play</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mockup Preview */}
                        <div className="relative h-[400px] lg:h-full min-h-[500px] order-1 lg:order-2 bg-secondary/30 flex items-center justify-center p-12 overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,20,147,0.05),transparent_70%)]"></div>

                            {/* Mobile Phone Mockup */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative w-64 h-[500px] bg-white rounded-[2.5rem] border-[6px] border-secondary shadow-2xl overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-secondary rounded-b-xl z-20"></div>

                                <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pt-12 p-6 flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-[10px] font-bold font-sans tracking-widest text-muted-foreground">DASHBOARD</div>
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck size={12} /></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-xl font-serif font-bold text-foreground tracking-tight">YOUR REGISTRY</div>
                                        <div className="flex justify-between items-center bg-secondary/20 p-4 rounded-sm border border-border">
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Total Value</div>
                                                <div className="text-sm font-serif font-bold text-foreground">₦4.2M</div>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Gifts Added</div>
                                                <div className="text-sm font-serif font-bold text-foreground">124</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-border">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">RECENT PURCHASES</div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-secondary rounded-sm border border-white/5"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-2 w-2/3 bg-white/10"></div>
                                                    <div className="h-1.5 w-1/2 bg-white/5"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-secondary rounded-sm border border-white/5"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-2 w-2/3 bg-white/10"></div>
                                                    <div className="h-1.5 w-1/2 bg-white/5"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-secondary rounded-sm border border-white/5"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-2 w-2/3 bg-white/10"></div>
                                                    <div className="h-1.5 w-1/2 bg-white/5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;
