"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Baby, Gift, Users, ArrowRight } from "lucide-react";

const CategoryCard = ({
    title,
    description,
    icon: Icon,
    image,
    href
}: {
    title: string;
    description: string;
    icon: any;
    image: string;
    href: string
}) => {
    return (
        <Link href={href} className="group relative block h-[500px] overflow-hidden rounded-sm">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <motion.div
                    className="mb-4 w-12 h-12 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-colors duration-500"
                    whileHover={{ scale: 1.1 }}
                >
                    <Icon size={24} />
                </motion.div>

                <h3 className="text-3xl font-serif font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-muted-foreground font-sans leading-relaxed transition-colors group-hover:text-foreground/80">
                    {description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-[0.3em] text-foreground/50 group-hover:text-primary transition-colors">
                    CREATE REGISTRY <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

const RegistryTypeCards = () => {
    const categories = [
        {
            title: "WEDDING REGISTRY",
            description: "Add gifts from Jumia, Temu, and aso-ebi stores. Sync existing registries into one link.",
            icon: Heart,
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
            href: "/wedding"
        },
        {
            title: "BABY REGISTRY",
            description: "Everything your baby needs, from local boutiques to international platforms.",
            icon: Baby,
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65ee9?auto=format&fit=crop&q=80&w=800",
            href: "/baby"
        },
        {
            title: "GIFT LIST",
            description: "Birthdays, graduations, housewarmings, and every occasion in between.",
            icon: Gift,
            image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800",
            href: "/gift-list"
        },
        {
            title: "NONPROFIT LIST",
            description: "Help your community donate the right things to the right cause in Nigeria.",
            icon: Users,
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
            href: "/nonprofit"
        }
    ];

    return (
        <section className="py-24 bg-secondary/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-6">
                        <div className="section-label">Registry Types</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                            FOR ALL OF <span className="text-gold">LIFE'S OCCASIONS.</span>
                        </h2>
                    </div>
                    <Link
                        href="/create"
                        className="text-xs font-bold font-sans uppercase tracking-[0.4em] text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 group"
                    >
                        VIEW ALL CATEGORIES <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <CategoryCard {...cat} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RegistryTypeCards;
