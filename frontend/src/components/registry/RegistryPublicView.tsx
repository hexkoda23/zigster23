"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    MapPin,
    Calendar,
    ShoppingBag,
    ExternalLink,
    CheckCircle2,
    Palmtree,
    Home,
    MessageCircle,
    Share2,
    ArrowRight,
    X,
    Copy,
    Upload,
    Banknote,
    GraduationCap,
    Wallet,
    AlertCircle,
    CheckCheck,
} from "lucide-react";
import Link from "next/link";

// ── Icon lookup (fund icons stored as strings) ────────────────────────────────
const IconMap: Record<string, any> = { Wallet, Palmtree, Home, GraduationCap, Banknote };

// ── Helper ─────────────────────────────────────────────────────────────────────
function generatePaymentId() {
    return "ZGR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ── Gift Payment Modal ─────────────────────────────────────────────────────────
function GiftPaymentModal({ gift, onClose, ownerBankDetails, ownerAddress }: { gift: any; onClose: () => void; ownerBankDetails: any; ownerAddress: string }) {
    const [step, setStep] = useState<"details" | "confirm" | "receipt" | "done">("details");
    const [paymentId] = useState(generatePaymentId);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [copied, setCopied] = useState(false);

    const copyPaymentId = () => {
        navigator.clipboard.writeText(paymentId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const savePurchase = () => {
        const purchase = {
            id: Date.now().toString(),
            type: "Gift",
            giftId: gift.id,
            giftName: gift.name,
            amount: `₦${gift.price?.toLocaleString()}`,
            guestName: name,
            deliveryAddress: address,
            guestWhatsapp: phone, // using phone field for whatsapp for now
            paymentRef: paymentId,
            receiptName: receiptFile?.name || "receipt.jpg",
            date: new Date().toLocaleDateString("en-GB"),
            status: "Pending",
            thankSent: false
        };
        const existing = localStorage.getItem("zigster_purchases");
        const purchases = existing ? JSON.parse(existing) : [];
        localStorage.setItem("zigster_purchases", JSON.stringify([...purchases, purchase]));
        window.dispatchEvent(new Event("registryUpdate"));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                className="bg-background border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-8 border-b border-primary/5">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Buy This Gift</p>
                        <h2 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight leading-tight">{gift.name}</h2>
                        <p className="text-2xl font-serif font-bold text-gold">₦{(gift.price || 0).toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="text-foreground/40 hover:text-primary transition-colors mt-1"><X size={20} /></button>
                </div>

                <div className="p-8 space-y-8">
                    {step === "details" && (
                        <div className="space-y-6">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Your delivery details</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Full Name (Required)</label>
                                    <input
                                        type="text"
                                        placeholder="E.G. JOHN DOE"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-primary/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Delivery Address (Required)</label>
                                    <textarea
                                        placeholder="YOUR FULL SHIPPING ADDRESS"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="w-full bg-white/5 border border-primary/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Whatsapp Number (Required)</label>
                                    <input
                                        type="tel"
                                        placeholder="E.G. +234..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 border border-primary/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="bg-gold/5 border border-gold/20 p-5 space-y-1">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-widest">How it works</p>
                                <p className="text-[10px] text-foreground/70 leading-relaxed italic">Fill in your details, then you'll receive account info to pay. Once paid, upload your payment receipt and the gift owner will handle the ordering for you.</p>
                            </div>
                            <button
                                onClick={() => { if (name && address && phone) setStep("confirm"); }}
                                disabled={!name || !address || !phone}
                                className="w-full bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                CONTINUE TO PAYMENT →
                            </button>
                        </div>
                    )}

                    {step === "confirm" && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Payment Details</p>
                                <div className="bg-secondary/50 border border-primary/10 p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Bank</p>
                                        <p className="text-xs font-bold text-foreground">{ownerBankDetails?.bankName || "ACCESS BANK"}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Account No.</p>
                                        <p className="text-lg font-serif font-bold text-gold">{ownerBankDetails?.accountNumber || "0123456789"}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Account Name</p>
                                        <p className="text-xs font-bold text-foreground">{ownerBankDetails?.accountName || "REGISTRY OWNER"}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-primary/5 pt-4">
                                        <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Amount to Send</p>
                                        <p className="text-xl font-serif font-bold text-gold">₦{(gift.price || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment ID */}
                            <div className="bg-gold/10 border border-gold/30 p-5 space-y-3">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Your Payment Reference</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl font-serif font-bold text-gold tracking-widest flex-1">{paymentId}</p>
                                    <button onClick={copyPaymentId} className="text-gold hover:text-primary transition-colors">
                                        {copied ? <CheckCheck size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <p className="text-[9px] text-foreground/40 leading-relaxed">Use this as your transfer narration/description when making payment. This uniquely identifies your gift purchase.</p>
                            </div>

                            <div className="bg-gold/5 border border-gold/20 p-5 space-y-2">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Shipping Destination</p>
                                <p className="text-[10px] text-foreground leading-relaxed font-bold uppercase">{ownerAddress || "CONTACT OWNER FOR ADDRESS"}</p>
                                <p className="text-[9px] text-foreground/40 italic">Please use this address when ordering from the store website.</p>
                            </div>

                            {/* Delivery summary (Guest's info for owner's reference) */}
                            <div className="bg-white/5 border border-white/5 p-5 space-y-2">
                                <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Your Contact Info</p>
                                <p className="text-xs font-bold text-foreground">{name}</p>
                                <p className="text-[10px] text-foreground/50">{phone}</p>
                            </div>

                            <button
                                onClick={() => setStep("receipt")}
                                className="w-full bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500"
                            >
                                I'VE MADE THE TRANSFER →
                            </button>
                            <button onClick={() => setStep("details")} className="w-full text-center text-[9px] font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
                                ← BACK
                            </button>
                        </div>
                    )}

                    {step === "receipt" && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Upload Payment Receipt</p>
                                <p className="text-[10px] text-foreground/50 leading-relaxed">Upload a screenshot or photo of your bank transfer receipt. This will be sent to the registry owner to confirm your gift purchase.</p>
                            </div>

                            <div className="bg-white/5 border border-gold/20 p-3 flex items-center gap-3">
                                <p className="text-[9px] font-bold text-gold/60 uppercase tracking-widest">Reference:</p>
                                <p className="text-sm font-serif font-bold text-gold">{paymentId}</p>
                            </div>

                            <label className="block w-full border-2 border-dashed border-white/10 hover:border-gold/40 transition-colors cursor-pointer p-10 text-center space-y-4">
                                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
                                {receiptFile ? (
                                    <div className="space-y-2">
                                        <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                                        <p className="text-xs font-bold text-foreground">{receiptFile.name}</p>
                                        <p className="text-[9px] text-foreground/40">Tap to change file</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Upload size={32} className="text-foreground/20 mx-auto" />
                                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Click to upload receipt</p>
                                        <p className="text-[9px] text-foreground/20">JPG, PNG, PDF accepted</p>
                                    </div>
                                )}
                            </label>

                            <button
                                onClick={() => { if (receiptFile) { savePurchase(); setStep("done"); } }}
                                disabled={!receiptFile}
                                className="w-full bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                SUBMIT RECEIPT & CONFIRM →
                            </button>
                        </div>
                    )}

                    {step === "done" && (
                        <div className="py-8 text-center space-y-8">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 mx-auto">
                                    <CheckCircle2 size={40} />
                                </div>
                            </motion.div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-serif font-bold text-foreground uppercase tracking-tight">Gift Confirmed!</h3>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Payment receipt submitted</p>
                                <p className="text-[10px] text-foreground/50 leading-relaxed max-w-xs mx-auto">
                                    The registry owner has been notified. They will review your receipt and handle the ordering. Your reference: <span className="text-gold font-bold">{paymentId}</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-primary text-white px-10 py-4 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500"
                            >
                                CLOSE
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ── Cash Fund Donation Modal ────────────────────────────────────────────────────
function CashFundModal({ fund, onClose, ownerBankDetails }: { fund: any; onClose: () => void; ownerBankDetails: any }) {
    const [step, setStep] = useState<"amount" | "payment" | "receipt" | "done">("amount");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [paymentId, setPaymentId] = useState(generatePaymentId);
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [copied, setCopied] = useState(false);
    const [phone, setPhone] = useState("");

    const quickAmounts = [5000, 10000, 25000, 50000, 100000];

    const copyPaymentId = () => {
        navigator.clipboard.writeText(paymentId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const saveDonation = () => {
        const purchase = {
            id: Date.now().toString(),
            type: "Cash Fund",
            giftId: fund.id,
            giftName: fund.title,
            amount: `₦${parseInt(amount).toLocaleString()}`,
            guestName: name || "Anonymous",
            guestWhatsapp: phone,
            paymentRef: paymentId,
            origin: typeof window !== 'undefined' ? window.location.origin : "",
            receiptName: receiptFile?.name || "receipt.jpg",
            date: new Date().toLocaleDateString("en-GB"),
            status: "Pending",
            thankSent: false
        };
        const existing = localStorage.getItem("zigster_purchases");
        const purchases = existing ? JSON.parse(existing) : [];
        localStorage.setItem("zigster_purchases", JSON.stringify([...purchases, purchase]));

        // Also update the fund's raised amount (optimistically)
        const fundsRaw = localStorage.getItem("zigster_funds");
        if (fundsRaw) {
            const funds = JSON.parse(fundsRaw);
            const updatedFunds = funds.map((f: any) => {
                if (f.id === fund.id) {
                    const currentRaised = parseFloat(String(f.raised).replace(/[^0-9.]/g, "")) || 0;
                    return { ...f, raised: `₦${(currentRaised + parseInt(amount)).toLocaleString()}`, contributors: (f.contributors || 0) + 1 };
                }
                return f;
            });
            localStorage.setItem("zigster_funds", JSON.stringify(updatedFunds));
        }

        window.dispatchEvent(new Event("registryUpdate"));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                className="bg-background border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between p-8 border-b border-primary/5">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Contribute to Fund</p>
                        <h2 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight leading-tight">{fund.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-foreground/40 hover:text-primary transition-colors mt-1"><X size={20} /></button>
                </div>

                <div className="p-8 space-y-8">
                    {step === "amount" && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Quick amounts</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {quickAmounts.map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setAmount(a.toString())}
                                            className={`py-3 text-[9px] font-bold uppercase tracking-widest border transition-all ${amount === a.toString() ? "bg-gold text-white border-gold" : "border-primary/10 text-foreground/60 hover:border-gold/40"}`}
                                        >
                                            ₦{a.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Or enter custom amount</p>
                                <div className="flex items-center bg-white/5 border border-white/10 focus-within:border-gold/50 transition-colors">
                                    <span className="pl-5 text-gold font-serif font-bold text-lg">₦</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="flex-1 bg-transparent px-3 py-4 font-serif text-xl font-bold text-foreground outline-none placeholder:text-foreground/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Your Name (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="E.G. ANONYMOUS"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Whatsapp Number (Required)</label>
                                    <input
                                        type="tel"
                                        placeholder="E.G. +234..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Message (Optional)</label>
                                    <textarea
                                        placeholder="LEAVE A BEAUTIFUL NOTE..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={2}
                                        className="w-full bg-white/5 border border-white/10 px-5 py-4 font-sans text-xs tracking-widest text-foreground uppercase placeholder:text-foreground/20 outline-none focus:border-gold/50 transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => { if (amount && parseInt(amount) > 0 && phone) { setPaymentId(generatePaymentId()); setStep("payment"); } }}
                                disabled={!amount || parseInt(amount) <= 0 || !phone}
                                className="w-full bg-gold text-background py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                PROCEED TO PAYMENT →
                            </button>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/10 p-6 space-y-4">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Transfer Details</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Bank</p>
                                    <p className="text-xs font-bold text-foreground">{ownerBankDetails?.bankName || "ACCESS BANK"}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Account No.</p>
                                    <p className="text-lg font-serif font-bold text-gold">{ownerBankDetails?.accountNumber || "0123456789"}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Account Name</p>
                                    <p className="text-xs font-bold text-foreground">{ownerBankDetails?.accountName || "REGISTRY OWNER"}</p>
                                </div>
                                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Amount to Send</p>
                                    <p className="text-2xl font-serif font-bold text-gold">₦{parseInt(amount).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-gold/10 border border-gold/30 p-5 space-y-3">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Payment Reference ID</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl font-serif font-bold text-gold tracking-widest flex-1">{paymentId}</p>
                                    <button onClick={copyPaymentId} className="text-gold hover:text-primary transition-colors">
                                        {copied ? <CheckCheck size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <p className="text-[9px] text-foreground/60 font-bold leading-relaxed">Use this as your transfer narration/description so we can match your payment.</p>
                            </div>

                            <button
                                onClick={() => setStep("receipt")}
                                className="w-full bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500"
                            >
                                I'VE MADE THE TRANSFER →
                            </button>
                            <button onClick={() => setStep("amount")} className="w-full text-center text-[9px] font-bold text-foreground/30 hover:text-foreground/60 transition-colors uppercase tracking-widest">
                                ← BACK
                            </button>
                        </div>
                    )}

                    {step === "receipt" && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em]">Upload Payment Receipt</p>
                                <p className="text-[10px] text-foreground/50 leading-relaxed">Upload your bank transfer screenshot or receipt. This confirms your contribution and notifies the registry owner.</p>
                            </div>

                            <div className="bg-white/5 border border-gold/20 p-3 flex items-center gap-3">
                                <p className="text-[9px] font-bold text-gold/60 uppercase tracking-widest">Ref:</p>
                                <p className="text-sm font-serif font-bold text-gold">{paymentId}</p>
                            </div>

                            <label className="block w-full border-2 border-dashed border-white/10 hover:border-gold/40 transition-colors cursor-pointer p-10 text-center space-y-4">
                                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
                                {receiptFile ? (
                                    <div className="space-y-2">
                                        <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                                        <p className="text-xs font-bold text-foreground">{receiptFile.name}</p>
                                        <p className="text-[9px] text-foreground/40">Tap to change</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Upload size={32} className="text-foreground/20 mx-auto" />
                                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Click to upload receipt</p>
                                        <p className="text-[9px] text-foreground/20">JPG, PNG, PDF accepted</p>
                                    </div>
                                )}
                            </label>

                            <button
                                onClick={() => { if (receiptFile) { saveDonation(); setStep("done"); } }}
                                disabled={!receiptFile}
                                className="w-full bg-primary text-white py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                CONFIRM contribution →
                            </button>
                        </div>
                    )}

                    {step === "done" && (
                        <div className="py-8 text-center space-y-8">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 mx-auto">
                                    <CheckCircle2 size={40} />
                                </div>
                            </motion.div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-serif font-bold text-foreground uppercase tracking-tight">Thank You!</h3>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Contribution Confirmed</p>
                                <p className="text-[10px] text-foreground/50 leading-relaxed max-w-xs mx-auto">
                                    ₦{parseInt(amount).toLocaleString()} contributed to <span className="text-gold font-bold">{fund.title}</span>. Your reference: <span className="text-gold font-bold">{paymentId}</span>
                                </p>
                            </div>
                            <button onClick={onClose} className="bg-primary text-white px-10 py-4 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500">
                                CLOSE
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// ── Gift Card ──────────────────────────────────────────────────────────────────
const GiftCard = ({ gift, ownerBankDetails, ownerAddress }: { gift: any; ownerBankDetails: any; ownerAddress: string }) => {
    const [purchased, setPurchased] = useState(gift.purchased || false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={`glass border-white/5 overflow-hidden group hover:border-gold/30 transition-all duration-500 flex flex-col h-full ${purchased ? "opacity-60" : ""}`}>
                <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                        src={gift.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(gift.name?.slice(0, 2) || "GF")}&size=400&background=1a1a2e&color=d4a853&bold=true`}
                        alt={gift.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    />
                    {purchased && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-6 z-10">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-serif font-bold text-white uppercase tracking-tight">PURCHASED!</p>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">THANK YOU</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                        <p className="text-[10px] font-bold text-gold uppercase tracking-widest">₦{(gift.price || 0).toLocaleString()}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{gift.store}</p>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-foreground uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{gift.name}</h3>
                    </div>

                    <div className="space-y-3">
                        {!purchased ? (
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full bg-gold text-background py-3 font-sans font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={14} /> BUY THIS GIFT
                            </button>
                        ) : (
                            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 py-3 text-[10px] font-bold text-emerald-400 uppercase tracking-widest text-center">
                                ALREADY PURCHASED
                            </div>
                        )}
                        {gift.url && (
                            <a href={gift.url} target="_blank" rel="noopener noreferrer"
                                className="w-full text-center text-[9px] font-bold text-white/30 hover:text-gold transition-colors uppercase tracking-widest flex items-center justify-center gap-1">
                                VIEW ON {gift.store || "STORE"} <ExternalLink size={9} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showModal && (
                    <GiftPaymentModal
                        gift={gift}
                        ownerBankDetails={ownerBankDetails}
                        ownerAddress={ownerAddress}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

// ── Cash Fund Widget ───────────────────────────────────────────────────────────
const CashFundWidget = ({ fund, ownerBankDetails }: { fund: any; ownerBankDetails: any }) => {
    const [showModal, setShowModal] = useState(false);
    const FundIcon = (typeof fund.icon === "string" ? IconMap[fund.icon] : fund.icon) || Wallet;
    const percentage = fund.raised && fund.target
        ? Math.min(100, Math.round((parseFloat(String(fund.raised).replace(/[^0-9.]/g, "")) / parseFloat(String(fund.target).replace(/[^0-9.]/g, ""))) * 100))
        : 0;

    return (
        <>
            <div className="glass p-8 border-gold/10 bg-gold/[0.02] space-y-6 group hover:border-gold/30 transition-all duration-500">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold rounded-sm group-hover:bg-gold group-hover:text-background transition-all duration-500">
                        <FundIcon size={24} />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Cash Fund</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight">{fund.title}</h3>
                    <div className="flex justify-between items-end">
                        <p className="text-2xl font-serif font-bold text-gold">{fund.raised || "₦0"}</p>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{percentage}% FUNDED</p>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gold"
                        />
                    </div>
                    {fund.target && (
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">TARGET: {fund.target}</p>
                    )}
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-primary text-white py-4 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 shadow-lg"
                >
                    CONTRIBUTE ANY AMOUNT
                </button>
            </div>

            <AnimatePresence>
                {showModal && (
                    <CashFundModal
                        fund={fund}
                        ownerBankDetails={ownerBankDetails}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

// ── Main Public View ───────────────────────────────────────────────────────────
export default function RegistryPublicView({ id }: { id: string }) {
    const [registry, setRegistry] = useState<any>(null);
    const [gifts, setGifts] = useState<any[]>([]);
    const [funds, setFunds] = useState<any[]>([]);
    const [ownerAddress, setOwnerAddress] = useState("ADDRESS NOT SET");
    const [ownerBankDetails, setOwnerBankDetails] = useState<any>({
        bankName: "ACCESS BANK",
        accountNumber: "0123456789",
        accountName: "REGISTRY OWNER",
    });
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Load data from localStorage (in a real app this would be a DB fetch by ID)
        const regRaw = localStorage.getItem("zigster_registry");
        if (regRaw) {
            const reg = JSON.parse(regRaw);
            setRegistry(reg);
            if (reg.bankDetails) setOwnerBankDetails(reg.bankDetails);
            if (reg.address) setOwnerAddress(reg.address);
        }
        const giftsRaw = localStorage.getItem("zigster_gifts");
        if (giftsRaw) setGifts(JSON.parse(giftsRaw));

        const fundsRaw = localStorage.getItem("zigster_funds");
        if (fundsRaw) setFunds(JSON.parse(fundsRaw));

        const handleUpdate = () => {
            const freshGifts = localStorage.getItem("zigster_gifts");
            if (freshGifts) setGifts(JSON.parse(freshGifts));
            const freshFunds = localStorage.getItem("zigster_funds");
            if (freshFunds) setFunds(JSON.parse(freshFunds));
        };

        window.addEventListener('registryUpdate', handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('registryUpdate', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const categories = ["all", ...Array.from(new Set(gifts.map((g) => (g.category || "other").toLowerCase())))];
    const filteredGifts = filter === "all" ? gifts : gifts.filter((g) => (g.category || "").toLowerCase() === filter);

    const registryTitle = registry?.title || id.replace(/-/g, " ");
    const eventType = registry?.type || "registry";
    const eventDate = registry?.date ? new Date(registry.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

    return (
        <div className="bg-background min-h-screen text-white font-sans">
            {/* Editorial Header */}
            <header className="relative h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                        alt="Registry Banner"
                        className="w-full h-full object-cover grayscale opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-6">
                        {eventDate && (
                            <div className="flex items-center justify-center gap-4 text-gold/60">
                                <div className="h-[1px] w-12 bg-gold/30"></div>
                                <span className="text-xs font-bold uppercase tracking-[0.5em]">{eventDate}</span>
                                <div className="h-[1px] w-12 bg-gold/30"></div>
                            </div>
                        )}

                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none uppercase">
                            {registryTitle}
                        </h1>

                        <div className="flex items-center justify-center gap-8 text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                            <div className="flex items-center gap-2">
                                <Heart size={16} className="text-gold" /> {eventType.toUpperCase()} REGISTRY
                            </div>
                            {gifts.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={16} className="text-gold" /> {gifts.length} GIFTS
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="bg-gold text-background px-12 py-6 font-sans font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-[0_0_50px_rgba(212,168,83,0.2)]"
                        onClick={() => { document.getElementById("gifts-section")?.scrollIntoView({ behavior: "smooth" }); }}
                    >
                        VIEW GIFT LIST ↓
                    </motion.button>
                </div>
            </header>

            {/* Main Content */}
            <main id="gifts-section" className="py-24 space-y-32">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Cash Funds */}
                    {funds.length > 0 && (
                        <div className="space-y-12 mb-32">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div className="space-y-4">
                                    <div className="section-label">Contribution Funds</div>
                                    <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">THE BIG <span className="text-gold">DREAMS.</span></h2>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-xs text-right leading-relaxed">
                                    CONTRIBUTE ANY AMOUNT TOWARD THEIR GOALS. SECURED PAYMENTS.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {funds.map((fund, i) => (
                                    <CashFundWidget key={i} fund={fund} ownerBankDetails={ownerBankDetails} />
                                ))}
                                {/* Direct Bank Transfer Card */}
                                <div className="glass p-10 border-white/5 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-2">
                                        <Banknote size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-serif font-bold text-white uppercase tracking-tight">DIRECT BANK TRANSFER</h4>
                                        <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-widest">Want to transfer directly? Click below for account details.</p>
                                    </div>
                                    <div className="w-full bg-secondary/30 border border-primary/5 p-4 space-y-2 text-left">
                                        <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">Bank</p>
                                        <p className="text-xs font-bold text-foreground">{ownerBankDetails.bankName}</p>
                                        <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest mt-2">Account</p>
                                        <p className="text-xl font-serif font-bold text-gold">{ownerBankDetails.accountNumber}</p>
                                        <p className="text-xs font-bold text-foreground">{ownerBankDetails.accountName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gift Grid */}
                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-16">
                            <div className="space-y-4">
                                <div className="section-label">The Gift List</div>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground tracking-tight uppercase">OUR <span className="text-gold italic">WISHES.</span></h2>
                            </div>

                            {categories.length > 1 && (
                                <div className="flex items-center gap-1 bg-white/5 p-1 border border-white/5 flex-wrap">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilter(cat)}
                                            className={`px-5 py-3 text-[9px] font-bold uppercase tracking-widest transition-all ${filter === cat ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {filteredGifts.length === 0 ? (
                            <div className="py-24 text-center space-y-4">
                                <ShoppingBag size={48} className="text-foreground/10 mx-auto" />
                                <p className="text-sm font-serif font-bold text-foreground/30 uppercase tracking-tight">No gifts found</p>
                                <p className="text-[10px] text-foreground/20 uppercase tracking-widest">The registry owner hasn't added gifts yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {filteredGifts.map((gift, i) => (
                                    <motion.div
                                        key={gift.id || i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.05 }}
                                    >
                                        <GiftCard gift={gift} ownerBankDetails={ownerBankDetails} ownerAddress={ownerAddress} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Guest Message Section */}
                <section className="bg-secondary/30 py-24 border-y border-white/5">
                    <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-serif font-bold text-foreground uppercase tracking-tight leading-tight">LEAVE A <span className="text-gold italic">MESSAGE.</span></h3>
                            <p className="text-xs text-muted-foreground font-sans uppercase tracking-[0.3em]">YOUR WELL WISHES MEAN THE WORLD.</p>
                        </div>
                        <div className="glass p-1 shadow-inner">
                            <textarea
                                rows={6}
                                placeholder="WRITE YOUR MESSAGE TO THE REGISTRY OWNER..."
                                className="w-full bg-background/50 border-none px-8 py-8 font-sans text-sm tracking-wide focus:ring-1 focus:ring-gold outline-none text-foreground uppercase resize-none placeholder:text-foreground/40"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-background/50 border-none px-8 py-5 font-sans text-xs tracking-widest focus:ring-1 focus:ring-gold outline-none text-foreground uppercase placeholder:text-foreground/40"
                            />
                            <button className="bg-primary text-white font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 shadow-xl shadow-gold/10 py-5">
                                SEND MESSAGE →
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Powered by Z23 Sticky */}
            <div className="fixed bottom-8 right-8 z-50">
                <Link href="/" className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 group hover:border-gold/50 transition-all duration-500 shadow-2xl">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Start your own registry</span>
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-background group-hover:scale-110 transition-transform">
                        <ArrowRight size={12} strokeWidth={3} />
                    </div>
                </Link>
            </div>
        </div>
    );
}
