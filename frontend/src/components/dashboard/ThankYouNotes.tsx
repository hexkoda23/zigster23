"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Mail, CheckCircle2, Clock, Send, Search, Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function CustomMessageModal({ purchase, onClose, onSend }: { purchase: any; onClose: () => void; onSend: (msg: string) => void }) {
    const defaultMsg = `Hi ${purchase.guestName || "there"}! 🎉 Thank you so much for your gift${purchase.giftName ? ` of "${purchase.giftName}"` : ""}! Your kindness means the world to me. 🙏❤️`;
    const [msg, setMsg] = useState(defaultMsg);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border w-full max-w-lg p-8 space-y-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Customise Message</p>
                        <h3 className="text-xl font-serif font-bold text-foreground uppercase mt-1">To: {purchase.guestName || "Guest"}</h3>
                        {purchase.guestWhatsapp && <p className="text-[10px] text-muted-foreground mt-0.5">via WhatsApp: {purchase.guestWhatsapp}</p>}
                    </div>
                    <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
                </div>
                <textarea rows={6} value={msg} onChange={e => setMsg(e.target.value)} className="w-full bg-secondary/30 border border-border px-5 py-4 text-sm text-foreground font-sans outline-none focus:ring-1 focus:ring-primary resize-none" />
                <div className="flex gap-4">
                    <button onClick={() => onSend(msg)} className="flex-1 bg-[#25D366] text-white py-4 font-sans font-bold text-[10px] uppercase tracking-widest hover:brightness-110 flex items-center justify-center gap-2">
                        <MessageCircle size={16} /> SEND VIA WHATSAPP
                    </button>
                    <button onClick={onClose} className="flex-1 border border-border py-4 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-secondary/50 transition-all">
                        CANCEL
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function ThankYouNotes() {
    const [purchases, setPurchases] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [autoThank, setAutoThank] = useState(false);
    const [composing, setComposing] = useState<any | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem("zigster_purchases");
        if (raw) setPurchases(JSON.parse(raw));
        const prefs = localStorage.getItem("zigster_prefs");
        if (prefs) setAutoThank(JSON.parse(prefs).autoThank || false);
    }, []);

    const markSent = (id: string, method: string) => {
        const updated = purchases.map(p => p.id === id ? { ...p, thankSent: true, thankMethod: method, thankDate: new Date().toLocaleDateString("en-GB") } : p);
        setPurchases(updated);
        localStorage.setItem("zigster_purchases", JSON.stringify(updated));
    };

    const sendWhatsApp = (p: any, msg: string) => {
        const num = (p.guestWhatsapp || "").replace(/\D/g, "");
        if (!num) { alert("No WhatsApp number for this guest."); return; }
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
        markSent(p.id, "WhatsApp");
        setComposing(null);
    };

    const sendEmail = (p: any) => {
        const subject = encodeURIComponent("Thank You for Your Gift! 🎁");
        const body = encodeURIComponent(`Hi ${p.guestName || "there"},\n\nThank you so much for your generous gift${p.giftName ? ` of "${p.giftName}"` : ""}! Your kindness truly means the world to us. 🙏\n\nWith gratitude 💛`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        markSent(p.id, "Email");
    };

    const toggleAutoThank = () => {
        const val = !autoThank;
        setAutoThank(val);
        const prefs = localStorage.getItem("zigster_prefs");
        const p = prefs ? JSON.parse(prefs) : {};
        localStorage.setItem("zigster_prefs", JSON.stringify({ ...p, autoThank: val }));
    };

    const filtered = purchases.filter(p => !search || (p.guestName || "").toLowerCase().includes(search.toLowerCase()) || (p.giftName || "").toLowerCase().includes(search.toLowerCase()));
    const sent = purchases.filter(p => p.thankSent).length;
    const pending = purchases.filter(p => !p.thankSent).length;

    return (
        <section className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 border-border flex items-center gap-6">
                    <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-600 rounded-sm"><CheckCircle2 size={24} /></div>
                    <div><p className="text-2xl font-serif font-bold text-foreground">{sent}</p><p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">NOTES SENT</p></div>
                </div>
                <div className="glass p-8 border-border flex items-center gap-6">
                    <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center text-amber-600 rounded-sm"><Clock size={24} /></div>
                    <div><p className="text-2xl font-serif font-bold text-foreground">{pending}</p><p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">NOTES PENDING</p></div>
                </div>
                <div className="glass p-8 border-border flex items-center gap-6">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary rounded-sm"><Heart size={24} /></div>
                    <div><p className="text-2xl font-serif font-bold text-foreground">{purchases.length > 0 ? Math.round((sent / purchases.length) * 100) : 0}%</p><p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">GRATITUDE RATE</p></div>
                </div>
            </div>

            {/* Auto-Thank Toggle */}
            <div className="bg-secondary/40 p-6 border border-border flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-serif font-bold text-foreground uppercase">AUTO-THANK GUESTS</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">When enabled, a thank-you WhatsApp message is sent automatically whenever a guest submits a payment receipt.</p>
                </div>
                <button onClick={toggleAutoThank} className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${autoThank ? "bg-emerald-500" : "bg-secondary border border-border"}`}>
                    <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${autoThank ? "left-8" : "left-1"}`} />
                </button>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{autoThank ? "ON" : "OFF"}</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 w-full max-w-md bg-white border border-border flex items-center px-6 py-3 rounded-sm group hover:border-primary/30 transition-all">
                    <Search size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <input type="text" placeholder="SEARCH GUESTS..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-foreground ml-4 w-full" />
                </div>
            </div>

            {/* Table */}
            <div className="glass overflow-hidden border-border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-secondary/20">
                                {["GUEST", "GIFT / REASON", "STATUS", "SENT VIA", "DATE", "ACTION"].map(h => (
                                    <th key={h} className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.length > 0 ? filtered.map((p, i) => (
                                <tr key={p.id || i} className="group hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-bold text-foreground uppercase tracking-tight">{p.guestName || "Anonymous"}</p>
                                        <p className="text-[9px] text-muted-foreground mt-0.5">{p.guestWhatsapp || "—"}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-[10px] font-bold text-foreground uppercase tracking-tight max-w-[160px] truncate">{p.giftName}</p>
                                        <p className="text-[9px] text-muted-foreground mt-0.5">{p.amount}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        {p.thankSent
                                            ? <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10} /> SENT</span>
                                            : <span className="text-[9px] font-bold text-amber-500 flex items-center gap-1"><Clock size={10} /> PENDING</span>}
                                    </td>
                                    <td className="px-6 py-5"><span className="text-[10px] font-bold text-foreground/50">{p.thankMethod || "—"}</span></td>
                                    <td className="px-6 py-5"><span className="text-[10px] font-bold text-foreground/50">{p.thankDate || p.date || "—"}</span></td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-3">
                                            <button onClick={() => setComposing(p)} title="WhatsApp" className="p-2 text-muted-foreground hover:text-[#25D366] transition-colors"><MessageCircle size={16} /></button>
                                            <button onClick={() => sendEmail(p)} title="Email" className="p-2 text-muted-foreground hover:text-primary transition-colors"><Mail size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-sm font-serif font-bold text-foreground uppercase">No guests yet</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">When guests buy gifts via your registry, they'll appear here.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {composing && (
                    <CustomMessageModal purchase={composing} onClose={() => setComposing(null)} onSend={(msg) => sendWhatsApp(composing, msg)} />
                )}
            </AnimatePresence>
        </section>
    );
}
