"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const user = localStorage.getItem("zigster_user");
        setIsLoggedIn(!!user);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("zigster_session");
        localStorage.removeItem("zigster_user");
        localStorage.removeItem("zigster_registry");
        window.location.href = "/";
    };


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname?.startsWith("/dashboard")) return null;

    const navLinks = [
        { name: "Find a Registry", href: "/find" },
        { name: "Wedding", href: "/wedding" },
        { name: "Baby", href: "/baby" },
        { name: "Gift List", href: "/gift-list" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Stores", href: "/stores" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 bg-gold rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <span className="text-background font-bold text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">Z</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-serif font-bold tracking-wider text-foreground">ZIGISTER</span>
                        <span className="text-xs font-sans tracking-[0.3em] text-primary font-bold">23</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-sans font-medium hover:text-primary transition-colors tracking-wide uppercase text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-6">
                    <button className="text-foreground hover:text-gold transition-colors p-2">
                        <Search size={20} />
                    </button>
                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-sans font-bold hover:text-primary transition-colors uppercase tracking-widest text-foreground">
                                Dashboard
                            </Link>
                            <button onClick={handleSignOut} className="text-sm font-sans font-bold text-muted-foreground hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2">
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-sans font-bold hover:text-primary transition-colors uppercase tracking-widest text-foreground">
                            Log In
                        </Link>
                    )}
                    <Link
                        href="/create"
                        className="bg-primary text-white px-6 py-2.5 rounded-none font-sans font-bold text-sm uppercase tracking-widest hover:bg-foreground transition-colors duration-300"
                    >
                        Create Registry
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex lg:hidden items-center gap-4">
                    <button className="text-foreground p-2">
                        <Search size={20} />
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-foreground p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 lg:hidden flex flex-col gap-6"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-sans font-bold uppercase tracking-widest hover:text-primary text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-border" />
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-sans font-bold uppercase tracking-widest hover:text-primary text-foreground"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/create"
                                onClick={() => setMobileMenuOpen(false)}
                                className="bg-primary text-white px-6 py-4 text-center font-sans font-bold uppercase tracking-widest"
                            >
                                Create Registry
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
