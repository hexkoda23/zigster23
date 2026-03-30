"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";

const Stat = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
    const { count, elementRef } = useCountUp(end);
    return (
        <div ref={elementRef} className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tighter">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-[10px] md:text-xs font-sans font-bold text-primary uppercase tracking-[0.3em]">
                {label}
            </div>
        </div>
    );
};

const Hero = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("zigster_user");
        setIsLoggedIn(!!user);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,20,147,0.05),transparent_50%)]">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="section-label"
                    >
                        Built for Nigeria
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-primary/30"
                    >
                        ALL STORES.<br />ONE REGISTRY.<br /><span className="text-primary">BUILT FOR NIGERIA.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl text-lg md:text-xl text-muted-foreground font-sans leading-relaxed tracking-wide"
                    >
                        Add gifts from Jumia, Jiji, Temu, Zara, and any store in the world.
                        Share one link. Get exactly what you want. No more duplicate gifts.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 mt-4"
                    >
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/signup?redirectTo=/create"}
                            className="bg-primary text-white px-10 py-5 font-sans font-bold text-sm uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 shadow-[0_0_30px_rgba(255,20,147,0.15)] hover:shadow-xl text-center group"
                        >
                            <span className="inline-block group-hover:translate-x-1 transition-transform">{isLoggedIn ? "BACK TO DASHBOARD" : "CREATE YOUR REGISTRY →"}</span>
                        </Link>
                        <Link
                            href="/find"
                            className="border border-primary/20 text-foreground px-10 py-5 font-sans font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/5 transition-all duration-500 text-center"
                        >
                            FIND A REGISTRY
                        </Link>
                    </motion.div>

                    {/* Animated Stats Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-12 mt-16 pt-16 border-t border-border"
                    >
                        <Stat end={1200000} label="Gifts Added" suffix="+" />
                        <Stat end={50000} label="Registries Created" suffix="+" />
                        <Stat end={200} label="Partner Stores" suffix="+" />
                    </motion.div>
                </div>

                {/* Floating Mockup Reveal Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="lg:col-span-4 hidden lg:block"
                >
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                        <div className="relative glass p-6 aspect-[3/4] flex flex-col gap-6 overflow-hidden rounded-sm border-border">
                            <div className="w-full aspect-square bg-secondary/50 rounded-sm overflow-hidden relative">
                                <img
                                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                                    alt="Wedding Registry"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                />
                                <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest shadow-sm">
                                    WEDDING
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-1 w-12 bg-primary"></div>
                                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">YOUR REGISTRY TITLE</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">LAGOS, NIGERIA • 2026</p>
                            </div>
                            <div className="mt-auto space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-border">
                                    <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-primary">85% COMPLETE</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-[10px] border border-border">J</div>
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-[10px] border border-border">T</div>
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-[10px] border border-border">JI</div>
                                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-[10px] border border-border">K</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
