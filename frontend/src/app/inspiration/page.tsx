"use client";

import React from "react";
import { Sparkles, ArrowRight, Heart, Share2, Search, Filter, Camera } from "lucide-react";
import { motion } from "framer-motion";

const InspirationBoard = ({ title, category, image, count }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass border-white/5 overflow-hidden group hover:border-gold/30 transition-all duration-500 cursor-pointer"
    >
        <div className="relative aspect-[3/4] overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>

            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 border border-white/10 flex items-center gap-2">
                <Heart size={12} className="text-gold" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{count}</span>
            </div>
        </div>

        <div className="p-8 space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.3em]">{category}</p>
                <button className="text-muted-foreground hover:text-white transition-colors">
                    <Share2 size={14} />
                </button>
            </div>
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight group-hover:text-gold transition-colors leading-tight">
                {title}
            </h3>
            <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                EXPLORE BOARD <ArrowRight size={14} />
            </button>
        </div>
    </motion.div>
);

const boards = [
    { title: "Lekki Penthouse Minimalist", category: "Modern Home", count: "1.2k", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
    { title: "Traditional Yoruba Wedding", category: "Big Day", count: "4.5k", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
    { title: "Smart Nursery Essentials", category: "Baby Prep", count: "850", image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=800" },
    { title: "Tech Haven: Home Office", category: "Lifestyle", count: "2.1k", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" },
    { title: "The Royal Banquet Set", category: "Decor", count: "1.1k", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" },
    { title: "Outdoor Garden Soirée", category: "Event Prep", count: "920", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" },
];

export default function InspirationPage() {
    return (
        <main className="bg-background text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 space-y-24">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="section-label inline-block">Visual Guides</div>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter uppercase leading-none">
                            INSPIRATION <br />
                            <span className="text-gold italic">BOARDS.</span>
                        </h1>
                        <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.3em] leading-relaxed">
                            BROWSE CURATED REGISTRY COLLECTIONS INSPIRED BY REAL NIGERIAN HOMES AND EVENTS.
                        </p>
                    </div>

                    <div className="flex gap-4 w-full lg:w-auto">
                        <div className="w-full lg:w-80 glass p-2 border-white/10 flex items-center px-6 gap-4 bg-secondary">
                            <Search size={18} className="text-gold" />
                            <input
                                type="text"
                                placeholder="SEARCH BOARDS..."
                                className="w-full py-4 bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.3em] text-white"
                            />
                        </div>
                        <button className="p-5 border border-white/10 text-gold hover:bg-gold hover:text-background transition-all rounded-sm">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Boards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boards.map((board, i) => (
                        <InspirationBoard key={i} {...board} />
                    ))}
                </div>

                {/* Feature Quote */}
                <div className="bg-secondary/30 border-y border-white/5 py-32 text-center max-w-4xl mx-auto px-6 space-y-12">
                    <Camera className="text-gold mx-auto" size={48} strokeWidth={1} />
                    <p className="text-2xl md:text-4xl font-serif font-bold text-white uppercase tracking-tight italic leading-tight">
                        "WE CURATE. YOU CREATE. THE MOST BEAUTIFUL NIGERIAN REGISTRIES START HERE."
                    </p>
                    <button className="bg-white text-background px-16 py-6 font-sans font-bold text-[10px] uppercase tracking-[0.5em] hover:bg-gold transition-all duration-500 shadow-xl">
                        SUBMIT YOUR BOARD
                    </button>
                </div>

                {/* Recommendation Section */}
                <div className="space-y-12 pt-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-sm font-bold text-gold uppercase tracking-[0.4em]">Suggested for you</h2>
                        <p className="text-4xl font-serif font-bold text-white uppercase tracking-tight">FEATURED COLLECTIONS</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass p-1 border-white/10 relative h-[400px] group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1540333032255-59feef1653ff?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background p-12 flex flex-col justify-end space-y-4">
                                <h4 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">MODERN NAIJA KITCHEN</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">32 ESSENTIAL ITEMS</p>
                                <button className="bg-gold text-background px-8 py-3 w-max font-sans font-bold text-[9px] uppercase tracking-widest hover:bg-white transition-all">
                                    VIEW COLLECTION
                                </button>
                            </div>
                        </div>
                        <div className="glass p-1 border-white/10 relative h-[400px] group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background p-12 flex flex-col justify-end space-y-4">
                                <h4 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">LUXURY BEDROOM GOALS</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">15 CURATED PICKS</p>
                                <button className="bg-gold text-background px-8 py-3 w-max font-sans font-bold text-[9px] uppercase tracking-widest hover:bg-white transition-all">
                                    VIEW COLLECTION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
