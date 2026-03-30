"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { mockTestimonials } from "@/lib/mockData";

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);

    return (
        <section className="py-24 bg-secondary/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-4 space-y-8">
                        <div className="section-label">Testimonials</div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                            LOVED BY <br />
                            <span className="text-primary italic">MODERN COUPLES.</span>
                        </h2>
                        <p className="text-muted-foreground font-sans text-sm leading-relaxed uppercase tracking-wider">
                            Real stories from Nigerians who transformed their gifting experience with Zigister 23.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 relative">
                        <div className="absolute -top-10 -left-10 text-primary opacity-10">
                            <Quote size={120} />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.6 }}
                                className="glass p-12 md:p-20 relative z-10"
                            >
                                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0 animate-glow">
                                        <img
                                            src={mockTestimonials[currentIndex].image}
                                            alt={mockTestimonials[currentIndex].name}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed italic">
                                            "{mockTestimonials[currentIndex].quote}"
                                        </p>
                                        <div>
                                            <h4 className="text-lg font-serif font-bold text-primary tracking-tight uppercase">
                                                {mockTestimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em]">
                                                {mockTestimonials[currentIndex].location}, NIGERIA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
