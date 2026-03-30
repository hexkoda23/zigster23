"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    MessageCircle, Copy, Download, Share2, Globe, Instagram, Facebook, Mail, CheckCheck, ExternalLink
} from "lucide-react";
import QRCode from "qrcode";

export default function ShareRegistry() {
    const [registryId, setRegistryId] = useState("your-link");
    const [baseUrl, setBaseUrl] = useState("https://zigister23.com");
    const [ownerName, setOwnerName] = useState("Your");
    const [eventType, setEventType] = useState("registry");
    const [copied, setCopied] = useState(false);
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const qrCanvasRef = useRef<HTMLCanvasElement>(null);

    const fullRegistryUrl = `${baseUrl}/registry/${registryId}`;

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    }, []);

    useEffect(() => {
        const raw = localStorage.getItem("zigster_registry");
        if (raw) {
            const data = JSON.parse(raw);
            const slug = (data.username || data.title || "registry").toLowerCase().replace(/\s+/g, "-");
            setRegistryId(slug);
            setOwnerName(data.ownerName || data.title || "Your");
            setEventType(data.type || "registry");
        }
    }, []);

    // Draw QR onto canvas whenever URL changes
    useEffect(() => {
        if (!qrCanvasRef.current) return;
        QRCode.toCanvas(qrCanvasRef.current, fullRegistryUrl, {
            width: 200,
            margin: 2,
            color: { dark: "#1a1a2e", light: "#ffffff" },
        }).catch(console.error);
    }, [fullRegistryUrl]);

    const downloadQR = () => {
        if (!qrCanvasRef.current) return;
        const link = document.createElement("a");
        link.download = `zigister23-${registryId}-qr.png`;
        link.href = qrCanvasRef.current.toDataURL("image/png");
        link.click();
    };

    const copyLink = () => {
        navigator.clipboard.writeText(fullRegistryUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyEmbed = () => {
        navigator.clipboard.writeText(`<script src="${baseUrl}/sdk.js" data-id="${registryId}"></script>`);
        setCopiedEmbed(true);
        setTimeout(() => setCopiedEmbed(false), 2000);
    };

    const shareWhatsApp = () => {
        const msg = encodeURIComponent(`🎁 We've created our ${eventType} gift registry on Zigister 23! You can view our wishlist and help us celebrate here:\n\n${fullRegistryUrl}\n\nThank you so much! 💛`);
        window.open(`https://wa.me/?text=${msg}`, "_blank");
    };

    const shareEmail = () => {
        const sub = encodeURIComponent(`Our ${eventType} Registry — ${ownerName}`);
        const body = encodeURIComponent(`Hi!\n\nWe've created our ${eventType} gift registry on Zigister 23. You can view and purchase gifts for us here:\n\n${fullRegistryUrl}\n\nThank you for your love and support! 💛`);
        window.open(`mailto:?subject=${sub}&body=${body}`);
    };

    const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullRegistryUrl)}`, "_blank");
    const shareNative = () => {
        if (navigator.share) {
            navigator.share({ title: `${ownerName}'s ${eventType} Registry`, url: fullRegistryUrl }).catch(() => { });
        } else {
            copyLink();
        }
    };

    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Share Card */}
                <div className="glass p-10 border-border space-y-10">
                    <div className="space-y-4">
                        <div className="text-[10px] font-bold text-foreground uppercase tracking-[0.4em]">Your Unique Link</div>
                        <div className="flex bg-secondary/30 p-4 border border-border items-center justify-between group hover:border-primary/30 transition-all duration-500">
                            <code className="text-[10px] font-bold text-foreground tracking-widest break-all mr-3">{fullRegistryUrl}</code>
                            <button onClick={copyLink} className="text-foreground hover:text-primary transition-colors p-2 shrink-0" title="Copy link">
                                {copied ? <CheckCheck size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                        </div>
                        {copied && <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">LINK COPIED TO CLIPBOARD!</p>}
                    </div>

                    <div className="space-y-6">
                        <label className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] block">One-Click Share</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={shareWhatsApp} className="bg-[#25D366] text-white py-5 rounded-sm font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-sm">
                                <MessageCircle size={20} /> WHATSAPP
                            </button>
                            <button onClick={shareEmail} className="bg-primary text-white py-5 rounded-sm font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-foreground transition-all shadow-sm">
                                <Mail size={20} /> EMAIL GUESTS
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => window.open(`https://www.instagram.com/`, "_blank")} className="border border-border text-foreground/70 py-4 flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors font-sans font-bold text-[9px] uppercase tracking-widest">
                                <Instagram size={16} /> IG
                            </button>
                            <button onClick={shareFacebook} className="border border-border text-foreground/70 py-4 flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors font-sans font-bold text-[9px] uppercase tracking-widest">
                                <Facebook size={16} /> FB
                            </button>
                            <button onClick={shareNative} className="border border-border text-foreground/70 py-4 flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors font-sans font-bold text-[9px] uppercase tracking-widest">
                                <Share2 size={16} /> MORE
                            </button>
                        </div>

                        {/* Invite Guests */}
                        <div className="pt-4 border-t border-border space-y-3">
                            <label className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] block">Invite Guests Directly</label>
                            <div className="flex gap-2">
                                <input type="email" placeholder="GUEST EMAIL ADDRESS" className="flex-1 bg-secondary/30 border border-border px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-primary" />
                                <button onClick={shareEmail} className="bg-primary text-white px-5 py-3 font-sans font-bold text-[9px] uppercase tracking-widest hover:bg-foreground transition-all">
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="glass p-10 border-border flex flex-col items-center justify-center text-center space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight">REGISTRY QR CODE</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">PRINT ON INVITATIONS OR DISPLAY AT YOUR EVENT.</p>
                    </div>

                    <div className="w-52 h-52 bg-white p-4 rounded-sm border-4 border-primary shadow-sm flex items-center justify-center">
                        <canvas ref={qrCanvasRef} className="w-full h-full" />
                    </div>

                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest max-w-xs">Scan to open your registry → {registryId}</p>

                    <div className="flex gap-4 w-full max-w-xs">
                        <button onClick={downloadQR} className="flex-1 bg-secondary/50 border border-border py-4 text-[9px] font-bold text-foreground uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                            <Download size={14} /> DOWNLOAD PNG
                        </button>
                        <a href={fullRegistryUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-primary/20 text-primary py-4 text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                            <ExternalLink size={14} /> PREVIEW
                        </a>
                    </div>
                </div>
            </div>

            {/* Embed Widget */}
            <div className="bg-secondary/30 p-10 border border-border space-y-8">
                <div className="flex gap-4 items-center">
                    <h3 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight">EMBED ON YOUR WEBSITE</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                        <p className="text-xs text-muted-foreground font-sans leading-relaxed tracking-wide">
                            Copy the code below to add a Zigister 23 widget to your personal or wedding website.
                        </p>
                        <div className="bg-white p-4 rounded-sm border border-border font-mono text-[10px] text-foreground font-bold overflow-x-auto whitespace-nowrap">
                            {`<script src="${baseUrl}/sdk.js" data-id="${registryId}"></script>`}
                        </div>
                    </div>
                    <button onClick={copyEmbed} className="bg-primary text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-3">
                        {copiedEmbed ? <><CheckCheck size={16} className="text-emerald-400" /> COPIED!</> : <><Copy size={16} /> COPY EMBED CODE</>}
                    </button>
                </div>
            </div>
        </section>
    );
}
