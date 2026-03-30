"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Twitter, MessageCircle, Send } from "lucide-react";

const Footer = () => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    if (pathname?.startsWith("/dashboard")) return null;

    const footerLinks = {
        about: [
            { name: "About Us", href: "/about" },
            { name: "Press", href: "/press" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
        ],
        members: [
            { name: "FAQs", href: "/#faq" },
            { name: "Mobile App", href: "/app" },
            { name: "Find a Registry", href: "/find" },
            { name: "Browser Extension", href: "/extension" },
            { name: "Gift Exchange", href: "/exchange" },
        ],
        registryTypes: [
            { name: "Wedding", href: "/wedding" },
            { name: "Baby", href: "/baby" },
            { name: "Birthday", href: "/birthday" },
            { name: "Graduation", href: "/graduation" },
            { name: "Housewarming", href: "/housewarming" },
            { name: "Nonprofit", href: "/nonprofit" },
        ],
        partners: [
            { name: "Jumia", href: "/stores" },
            { name: "Jiji", href: "/stores" },
            { name: "Temu", href: "/stores" },
            { name: "Konga", href: "/stores" },
            { name: "Payporte", href: "/stores" },
            { name: "Zara", href: "/stores" },
        ],
    };

    return (
        <footer className="bg-background border-t border-border pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newsletter Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20 border-b border-border">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-4 tracking-wider">STAY IN THE LOOP</h2>
                        <p className="text-muted-foreground font-sans uppercase tracking-[0.2em] text-xs">
                            On gifting trends and new Nigerian brand partnerships
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL ADDRESS"
                            className="flex-1 bg-secondary border-none px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-gold outline-none"
                        />
                        <button className="bg-primary text-white px-8 py-4 font-sans font-bold text-xs tracking-[0.3em] hover:bg-foreground transition-colors">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
                    <div>
                        <h3 className="font-sans font-bold text-xs tracking-[0.3em] text-gold mb-8 uppercase">About Zigister 23</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.about.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-xs tracking-[0.3em] text-gold mb-8 uppercase">For Members</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.members.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-xs tracking-[0.3em] text-gold mb-8 uppercase">Registry Types</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.registryTypes.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-xs tracking-[0.3em] text-gold mb-8 uppercase">Partner Stores</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.partners.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border gap-8">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-8 h-8 bg-primary rounded-sm flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                <span className="text-white font-bold text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-500">Z</span>
                            </div>
                            <span className="text-lg font-serif font-bold tracking-wider text-foreground">ZIGISTER 23</span>
                        </Link>
                        <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-[0.2em]">
                            © {currentYear} ZIGISTER 23. ALL RIGHTS RESERVED.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 text-foreground">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={18} /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle size={18} /></Link>
                        <div className="flex gap-6 ml-4">
                            <Link href="#" className="text-[10px] text-muted-foreground font-sans uppercase tracking-[0.2em] hover:text-primary transition-colors">TERMS</Link>
                            <Link href="#" className="text-[10px] text-muted-foreground font-sans uppercase tracking-[0.2em] hover:text-primary transition-colors">PRIVACY</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
