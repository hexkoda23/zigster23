"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, ShoppingBag, Globe, Zap, AlertCircle } from "lucide-react";

export default function AddItemModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd?: () => void }) {
    const [url, setUrl] = useState("");
    const [step, setStep] = useState(1);
    const [giftName, setGiftName] = useState("");
    const [price, setPrice] = useState("");
    const [store, setStore] = useState("");
    const [image, setImage] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const handleFetch = async () => {
        if (!url) return;
        setIsFetching(true);

        try {
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });

            if (response.ok) {
                const data = await response.json();
                setGiftName(data.name || "");
                setPrice(data.price?.replace("₦", "") || "0");
                setStore(data.store || "VARIOUS");
                setImage(data.image || "");
                setStep(2);
            }
        } catch (error) {
            console.error("Error fetching gift:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleConfirm = () => {
        const newGift = {
            id: Math.random().toString(36).substr(2, 9),
            name: giftName,
            price: parseFloat(price.replace(/,/g, "")) || 0,
            store: store,
            status: "available",
            image: image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
            category: "General",
            url: url,
            addedDate: new Date().toISOString()
        };

        const existingGifts = JSON.parse(localStorage.getItem("zigster_gifts") || "[]");
        localStorage.setItem("zigster_gifts", JSON.stringify([...existingGifts, newGift]));

        // Add to Recent Activity
        const activity = {
            id: Math.random().toString(36).substr(2, 9),
            type: "GIFT_ADDED",
            title: "Gift Added",
            description: `You added "${giftName}" from ${store}`,
            date: new Date().toISOString(),
            icon: "Gift"
        };
        const existingActivity = JSON.parse(localStorage.getItem("zigster_activity") || "[]");
        localStorage.setItem("zigster_activity", JSON.stringify([activity, ...existingActivity].slice(0, 10)));

        if (onAdd) onAdd();
        // Dispatch custom event for same-window updates
        window.dispatchEvent(new Event('registryUpdate'));

        onClose();
        setStep(1);
        setUrl("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background border border-border shadow-2xl z-[60] overflow-hidden rounded-sm"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-border flex justify-between items-center bg-secondary/10">
                            <div className="space-y-1">
                                <h2 className="text-xl font-serif font-bold text-foreground tracking-tight uppercase">ADD NEW GIFT</h2>
                                <p className="text-[9px] font-sans font-bold text-primary uppercase tracking-[0.3em]">ALL STORES. ONE REGISTRY.</p>
                            </div>
                            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                                                <Zap size={14} /> AUTO-FETCH FROM JUMIA, JIJI, OR TEMU
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                    <LinkIcon size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    placeholder="PASTE PRODUCT URL HERE..."
                                                    className="w-full bg-secondary/50 border border-border pl-16 pr-6 py-6 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="glass p-6 border-border space-y-4">
                                                <Globe size={20} className="text-primary" />
                                                <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Any Store</h4>
                                                <p className="text-[9px] text-muted-foreground leading-relaxed">Paste a link from any website in the world. We'll pull the info or you can add it manually.</p>
                                            </div>
                                            <div className="glass p-6 border-border space-y-4">
                                                <ShoppingBag size={20} className="text-primary" />
                                                <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Browser Extension</h4>
                                                <p className="text-[9px] text-muted-foreground leading-relaxed">Add items while you browse with our Chrome extension. One click, that's it.</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleFetch}
                                            disabled={!url || isFetching}
                                            className="w-full bg-primary text-white py-6 font-sans font-bold text-sm uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 disabled:opacity-50 mt-4 shadow-lg shadow-primary/10 flex items-center justify-center gap-3"
                                        >
                                            {isFetching ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                                                    />
                                                    FETCHING DETAILS...
                                                </>
                                            ) : (
                                                "FETCH GIFT DETAILS →"
                                            )}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className="w-full md:w-48 aspect-square bg-secondary border border-border flex items-center justify-center overflow-hidden">
                                                {image ? (
                                                    <img src={image} alt={giftName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ShoppingBag size={48} strokeWidth={1} className="text-primary/20" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Product Name</label>
                                                    <input
                                                        type="text"
                                                        value={giftName}
                                                        onChange={(e) => setGiftName(e.target.value)}
                                                        className="w-full bg-secondary/30 border border-border px-4 py-3 font-sans text-[10px] tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Estimated Price (₦)</label>
                                                        <input
                                                            type="text"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            className="w-full bg-secondary/30 border border-border px-4 py-3 font-sans text-[10px] tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Store</label>
                                                        <input
                                                            type="text"
                                                            value={store}
                                                            onChange={(e) => setStore(e.target.value)}
                                                            className="w-full bg-secondary/30 border border-border px-4 py-3 font-sans text-[10px] tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-amber-500/10 p-6 border border-amber-500/20 flex gap-4">
                                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                                            <p className="text-[9px] text-amber-500/80 font-bold uppercase tracking-widest leading-relaxed">
                                                Note: Guests will be redirected to the store to complete the purchase. You can also enable 'Direct Fund' to receive cash instead.
                                            </p>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 border border-border text-foreground py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary/50 transition-colors"
                                            >
                                                BACK
                                            </button>
                                            <button
                                                onClick={handleConfirm}
                                                className="flex-[2] bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 shadow-lg shadow-primary/10"
                                            >
                                                CONFIRM & ADD TO LIST
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
