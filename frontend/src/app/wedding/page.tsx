"use client";

import React from "react";
import { Heart, Calendar, MapPin, ArrowRight, ShoppingBag, Sparkles, Users, Gift } from "lucide-react";
import { motion } from "framer-motion";

const ValuePoint = ({ icon: Icon, title, text }: any) => (
    <div className="glass p-10 border-white/5 space-y-6 group hover:border-gold/30 transition-all duration-500">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-sm">
            <Icon size={20} />
        </div>
        <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">{text}</p>
        </div>
    </div>
);

export default function WeddingPage() {
    return (
        <main className="bg-[#080808] text-white overflow-hidden">
            {/* Editorial Hero */}
            <header className="relative h-screen min-h-[800px] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Wedding"
                        className="w-full h-full object-cover grayscale opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <div className="section-label inline-block">The Gold Standard</div>
                        <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter leading-none uppercase">
                            TRADITION <br />
                            <span className="text-gold italic">MEETS STYLE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl mx-auto">
                            "The only registry built specifically for Nigerian weddings. From local brands to global luxury, manage it all in one place."
                        </p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                        <button className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-2xl shadow-gold/20">
                            START WEDDING REGISTRY
                        </button>
                        <button className="border border-white/10 text-white px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-background transition-all duration-500">
                            FIND A WEDDING
                        </button>
                    </div>
                </div>
            </header>

            {/* Featured Points */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ValuePoint
                        icon={Sparkles}
                        title="Nigeria-First"
                        text="Direct integrations with Nigerian retailers like Slot, Jumia, and Konga with Naira support."
                    />
                    <ValuePoint
                        icon={Users}
                        title="Guest Experience"
                        text="Beautiful, mobile-optimized view for your guests to purchase what you really want."
                    />
                    <ValuePoint
                        icon={Gift}
                        title="Cash Funds"
                        text="Securely raise funds for your honeymoon or first home with Paystack & Flutterwave."
                    />
                </div>
            </section>

            {/* Image Gallery / Mood */}
            <section className="py-32 bg-secondary/30 border-y border-white/5">
                <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 aspect-[4/5] bg-background">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" alt="Wedding Detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <div className="aspect-[4/5] bg-background">
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" alt="Wedding Ring" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <div className="aspect-[4/5] bg-background">
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800" alt="Wedding Cake" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>
                </div>
            </section>

            {/* Registry Guide CTA */}
            <section className="py-48 text-center max-w-4xl mx-auto px-6 space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-tight">ELEVATE YOUR <span className="text-gold italic">BEGINNING.</span></h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.4em] leading-relaxed">
                        DITCH THE HASSLE OF UNWANTED GIFTS. GET THE THINGS YOU'LL ACTUALLY USE FOR THE NEXT 50 YEARS.
                    </p>
                </div>
                <button className="bg-white text-background px-16 py-7 font-sans font-bold text-sm uppercase tracking-[0.5em] hover:bg-gold transition-all duration-500 shadow-xl">
                    GET STARTED NOW
                </button>
            </section>
        </main>
    );
}
