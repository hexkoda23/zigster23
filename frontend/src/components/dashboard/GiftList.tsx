"use client";

import React, { useEffect, useState } from "react";
import {
    MoreVertical, ExternalLink, Filter, Search, Plus, CheckCircle2, Clock, Package, Copy, CheckCheck, ShoppingBag, Split
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function PartPayModal({ gift, bankDetails, onClose }: { gift: any; bankDetails: any; onClose: () => void }) {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [payRef] = useState("ZGR-" + Math.random().toString(36).substring(2, 8).toUpperCase());
    const [step, setStep] = useState<"input" | "confirm">("input");
    const [copied, setCopied] = useState(false);

    const copy = () => { navigator.clipboard.writeText(payRef); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border w-full max-w-md p-8 space-y-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="space-y-1">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Part Payment</p>
                    <h3 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight">{gift.name}</h3>
                    <p className="text-sm font-serif text-primary">{gift.price}</p>
                </div>
                {step === "input" && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Guest Name</label>
                            <input type="text" placeholder="WHO IS PAYING?" value={name} onChange={e => setName(e.target.value)} className="w-full bg-secondary/30 border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Amount to Pay (₦)</label>
                            <div className="flex items-center bg-secondary/30 border border-border focus-within:ring-1 focus-within:ring-primary">
                                <span className="pl-5 text-primary font-serif font-bold text-lg">₦</span>
                                <input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} className="flex-1 bg-transparent px-3 py-3 font-serif font-bold text-foreground outline-none text-lg" />
                            </div>
                        </div>
                        <button onClick={() => { if (amount && parseInt(amount) > 0) setStep("confirm"); }} disabled={!amount || parseInt(amount) <= 0} className="w-full bg-primary text-white py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-all disabled:opacity-40">
                            GENERATE PAYMENT REF →
                        </button>
                    </div>
                )}
                {step === "confirm" && (
                    <div className="space-y-5">
                        <div className="bg-secondary/30 border border-border p-5 space-y-3">
                            <div className="flex justify-between"><span className="text-[9px] text-muted-foreground uppercase tracking-widest">Bank</span><span className="text-xs font-bold text-foreground">{bankDetails?.bankName || "YOUR BANK"}</span></div>
                            <div className="flex justify-between"><span className="text-[9px] text-muted-foreground uppercase tracking-widest">Account</span><span className="text-base font-serif font-bold text-primary">{bankDetails?.accountNumber || "—"}</span></div>
                            <div className="flex justify-between"><span className="text-[9px] text-muted-foreground uppercase tracking-widest">Name</span><span className="text-xs font-bold text-foreground">{bankDetails?.accountName || "—"}</span></div>
                            <div className="flex justify-between pt-2 border-t border-border"><span className="text-[9px] text-muted-foreground uppercase tracking-widest">Amount</span><span className="text-xl font-serif font-bold text-primary">₦{parseInt(amount).toLocaleString()}</span></div>
                        </div>
                        <div className="bg-primary/5 border border-primary/20 p-4 space-y-2">
                            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Payment Reference</p>
                            <div className="flex items-center gap-3">
                                <p className="text-lg font-serif font-bold text-foreground flex-1">{payRef}</p>
                                <button onClick={copy} className="text-primary hover:text-foreground">{copied ? <CheckCheck size={16} className="text-emerald-500" /> : <Copy size={16} />}</button>
                            </div>
                            <p className="text-[9px] text-muted-foreground">Use this as transfer narration.</p>
                        </div>
                        <button onClick={onClose} className="w-full border border-border py-3 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-secondary/50 transition-all">DONE</button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default function GiftList() {
    const [filter, setFilter] = useState("all");
    const [gifts, setGifts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [partPayGift, setPartPayGift] = useState<any | null>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);

    useEffect(() => {
        const fetchGifts = () => {
            const giftsRaw = localStorage.getItem("zigster_gifts");
            if (giftsRaw) setGifts(JSON.parse(giftsRaw));
        };
        const fetchRegistry = () => {
            const regRaw = localStorage.getItem("zigster_registry");
            if (regRaw) {
                const reg = JSON.parse(regRaw);
                if (reg.bankDetails) setBankDetails(reg.bankDetails);
            }
        };
        fetchGifts();
        fetchRegistry();
        window.addEventListener("storage", fetchGifts);
        window.addEventListener("registryUpdate", fetchGifts);
        return () => {
            window.removeEventListener("storage", fetchGifts);
            window.removeEventListener("registryUpdate", fetchGifts);
        };
    }, []);

    const registrySlug = (() => {
        const reg = localStorage.getItem("zigster_registry");
        if (!reg) return "your-registry";
        const d = JSON.parse(reg);
        return (d.title || "registry").toLowerCase().replace(/\s+/g, "-");
    })();

    const copyGiftLink = (giftId: string) => {
        const url = `https://zigister23.com/registry/${registrySlug}#gift-${giftId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(giftId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredGifts = gifts.filter(g => {
        const matchesFilter = filter === "all" || (g.status || "available").toLowerCase() === filter;
        const matchesSearch = !search || g.name?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const deleteGift = (id: string) => {
        const updated = gifts.filter(g => g.id !== id);
        setGifts(updated);
        localStorage.setItem("zigster_gifts", JSON.stringify(updated));
    };

    return (
        <section className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 w-full max-w-md bg-white border border-border flex items-center px-6 py-3 rounded-sm group hover:border-primary/30 transition-all">
                    <Search size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <input type="text" placeholder="SEARCH GIFTS..." value={search} onChange={e => setSearch(e.target.value)}
                        className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-foreground ml-4 w-full" />
                </div>
                <div className="flex bg-secondary/30 p-1 rounded-sm border border-border">
                    {["all", "available", "purchased", "reserved"].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
                    ))}
                </div>
            </div>

            <div className="glass overflow-hidden border-border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-secondary/20">
                                <th className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">ITEM</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">STORE / PRICE</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">STATUS</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">SHARE LINK</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredGifts.length > 0 ? filteredGifts.map((gift, i) => (
                                <tr key={gift.id || i} className="group hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary/50 border border-border flex items-center justify-center shrink-0">
                                                {gift.image ? <img src={gift.image} alt="" className="w-full h-full object-cover" /> : <Package size={18} className="text-muted-foreground" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-foreground uppercase tracking-tight max-w-[200px] truncate group-hover:text-primary transition-colors">{gift.name}</p>
                                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">{gift.category || "General"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest border border-border px-2 py-1 bg-secondary/30 inline-block mb-1">{gift.store || "STORE"}</p>
                                        <p className="text-sm font-serif font-bold text-foreground block">{gift.price}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        {(gift.status || "available") === "Purchased" ? (
                                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> Purchased</span>
                                        ) : (gift.status || "available") === "Reserved" ? (
                                            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> Reserved</span>
                                        ) : (
                                            <span className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-1"><Plus size={10} /> Available</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        <button
                                            onClick={() => copyGiftLink(gift.id)}
                                            className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest border border-border px-3 py-2 hover:bg-primary hover:text-white hover:border-primary transition-all text-foreground/70"
                                        >
                                            {copiedId === gift.id ? <><CheckCheck size={12} className="text-emerald-500" /> COPIED!</> : <><Copy size={12} /> COPY LINK</>}
                                        </button>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {gift.url && (
                                                <a href={gift.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="View on store">
                                                    <ExternalLink size={15} />
                                                </a>
                                            )}
                                            <button onClick={() => setPartPayGift(gift)} className="text-muted-foreground hover:text-primary transition-colors" title="Part payment">
                                                <Split size={15} />
                                            </button>
                                            <button onClick={() => deleteGift(gift.id)} className="text-muted-foreground hover:text-red-500 transition-colors" title="Remove gift">
                                                <MoreVertical size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center">
                                        <div className="space-y-4 max-w-xs mx-auto">
                                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-primary/20 mx-auto">
                                                <ShoppingBag size={32} />
                                            </div>
                                            <p className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">
                                                {filter === "all" ? "No gifts yet" : `No ${filter} gifts`}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                                {filter === "all" ? "Paste a product URL in your registry wizard to add gifts." : `No gifts with status "${filter}" found.`}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {partPayGift && (
                    <PartPayModal gift={partPayGift} bankDetails={bankDetails} onClose={() => setPartPayGift(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
