"use client";

import React from "react";
import { ArrowRight, Calendar, User, Search, Filter, Share2, Tag } from "lucide-react";
import { motion } from "framer-motion";

const BlogPost = ({ title, excerpt, category, date, author, image }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group cursor-pointer space-y-8"
    >
        <div className="relative aspect-[16/9] overflow-hidden glass border-white/5">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute top-6 left-6 bg-gold text-background px-4 py-1.5 font-sans font-bold text-[9px] uppercase tracking-widest shadow-xl">
                {category}
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-6 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-2"><Calendar size={12} className="text-gold" /> {date}</span>
                <span className="flex items-center gap-2"><User size={12} className="text-gold" /> {author}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight group-hover:text-gold transition-colors leading-tight">
                {title}
            </h3>
            <p className="text-xs text-muted-foreground uppercase leading-relaxed tracking-widest line-clamp-2">
                {excerpt}
            </p>
            <button className="text-[10px] font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3 border-b border-white/10 pb-1 group-hover:border-gold group-hover:text-gold transition-all">
                READ ARTICLE <ArrowRight size={14} />
            </button>
        </div>
    </motion.div>
);

const articles = [
    {
        title: "10 Essential Items for Your Lagos Wedding Registry",
        excerpt: "From tech to tradition, we've curated the ultimate list for the modern Nigerian couple.",
        category: "Planning",
        date: "MARCH 12, 2026",
        author: "ZIGISTER TEAM",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
    },
    {
        title: "How to Manage Cash Funds for Your Big Dreams",
        excerpt: "The complete guide to setting up honeymoon and home deposit funds securely.",
        category: "Guides",
        date: "MARCH 10, 2026",
        author: "Z23 TEAM",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
    },
    {
        title: "Baby Registry Checklist: What You Need for Year One",
        excerpt: "We spoke to Nigerian moms to find the essentials that actually matter.",
        category: "Baby",
        date: "MARCH 08, 2026",
        author: "KEMI ADEBAYO",
        image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=1200"
    },
    {
        title: "The Ultimate Guide to Tech for Your New Home",
        excerpt: "From smart TVs to home security - elevate your living space with the latest gear.",
        category: "Tech",
        date: "MARCH 05, 2026",
        author: "CHIDI EZE",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200"
    },
];

export default function BlogPage() {
    return (
        <main className="bg-background text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 space-y-24">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="section-label inline-block">Editorial</div>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter uppercase leading-none">
                            Z23 <span className="text-gold italic">JOURNAL.</span>
                        </h1>
                        <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.3em] leading-relaxed">
                            INSIGHTS, TRENDS, AND GUIDES FOR THE NIGERIAN REGISTRY EXPERIENCE.
                        </p>
                    </div>

                    <div className="w-full lg:w-96 glass p-2 border-white/10 flex items-center px-6 gap-4 bg-secondary">
                        <Search size={18} className="text-gold" />
                        <input
                            type="text"
                            placeholder="SEARCH ARTICLES..."
                            className="w-full py-4 bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.3em] text-white"
                        />
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-6 overflow-x-auto pb-4 border-b border-white/5 scrollbar-hide">
                    {["LATEST", "PLANNING", "GUIDES", "BABY", "TECH", "LIFESTYLE"].map((cat) => (
                        <button key={cat} className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all whitespace-nowrap hover:text-gold ${cat === 'LATEST' ? 'text-gold' : 'text-white/40'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {articles.map((article, i) => (
                        <BlogPost key={i} {...article} />
                    ))}
                </div>

                {/* Featured Interview */}
                <div className="bg-secondary/30 border border-white/5 p-12 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="flex items-center gap-4 text-gold">
                            <Tag size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Featured Story</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight italic leading-tight">
                            "THE EVOLUTION OF NIGERIAN WEDDINGS."
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">
                            WE SAT DOWN WITH THE TOP WEDDING PLANNERS IN LAGOS TO DISCUSS HOW TECHNOLOGY IS REVOLUTIONIZING THE TRADITION OF GIVING.
                        </p>
                        <button className="bg-white text-background px-12 py-5 font-sans font-bold text-[10px] uppercase tracking-[0.5em] hover:bg-gold transition-all duration-500">
                            READ THE INTERVIEW →
                        </button>
                    </div>
                    <div className="aspect-square glass border-gold/10 overflow-hidden order-1 lg:order-2">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale" />
                    </div>
                </div>

                {/* Newsletter Wrap */}
                <div className="text-center pt-12 space-y-12">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">JOIN THE <span className="text-gold italic">INNER CIRCLE.</span></h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em]">GET WEEKLY INSIGHTS AND REGISTRY TIPS DELIVERED EXCLUSIVELY.</p>
                    </div>
                    <div className="glass p-2 border-white/10 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="flex-1 bg-secondary border-none px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-white outline-none"
                        />
                        <button className="bg-gold text-background px-10 py-5 font-sans font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
