"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { mockInspiration } from "@/lib/mockData";

const InspirationBoards = () => {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="section-label">Gift Guides</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                            INSPIRED <span className="text-primary">GIFTING.</span>
                        </h2>
                    </div>
                    <Link
                        href="/inspiration"
                        className="text-xs font-bold font-sans uppercase tracking-[0.4em] text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 group"
                    >
                        VIEW ALL BOARDS <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {mockInspiration.map((board, index) => (
                        <motion.div
                            key={board.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-8">
                                <img
                                    src={board.image}
                                    alt={board.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em] mb-2">
                                        {board.count} ITEMS
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-white tracking-tight uppercase leading-tight">
                                        {board.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-bold font-sans uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
                                EXPLORE BOARD <div className="h-[1px] w-12 bg-border group-hover:bg-primary group-hover:w-24 transition-all duration-500"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InspirationBoards;
