"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Apple, Home, CheckCircle2, Eye, EyeOff, ArrowRight, AlertCircle, Building2, Phone, MapPin, User } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Step 1 fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    // Step 2 fields
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) { setError("Please fill all required fields."); return; }
        setError("");
        setStep(2);
    };

    const handleStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const user = { name, email, phone, whatsapp: whatsapp || phone };
        const deliveryAddress = { street, city, state };
        const bankDetails = { bankName, accountNumber, accountName };

        // Save to localStorage
        localStorage.setItem("zigster_user", JSON.stringify(user));
        localStorage.setItem("zigster_session", JSON.stringify({ loggedIn: true, email, name }));

        const existingRegistry = localStorage.getItem("zigster_registry");
        const registry = existingRegistry ? JSON.parse(existingRegistry) : {};
        localStorage.setItem("zigster_registry", JSON.stringify({
            ...registry,
            ownerName: name,
            ownerEmail: email,
            ownerPhone: phone,
            ownerWhatsapp: whatsapp || phone,
            deliveryAddress,
            bankDetails,
        }));

        setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            router.push(params.get("redirectTo") || "/create");
        }, 500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Image Side */}
            <div className="hidden lg:block relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                    alt="Celebration"
                    className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                <div className="absolute bottom-20 left-20 right-20 space-y-6">
                    <div className="w-12 h-[2px] bg-gold" />
                    <h2 className="text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                        START YOUR <br /><span className="text-gold">GIFTING JOURNEY.</span>
                    </h2>
                    <div className="space-y-4 pt-4">
                        {["ADD FROM ANY STORE WORLDWIDE", "NATIVE NAIRA (₦) SUPPORT", "REAL-TIME PURCHASE TRACKING", "EASY WHATSAPP SHARING"].map((f, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs font-bold font-sans text-foreground/70 uppercase tracking-widest">
                                <CheckCircle2 size={14} className="text-gold" /> {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="w-full max-w-md space-y-10 relative z-10">
                    <div className="space-y-3">
                        <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-xs font-bold font-sans uppercase tracking-widest">
                            <Home size={14} /> BACK TO HOME
                        </Link>

                        {/* Step indicator */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${step >= 1 ? "bg-gold border-gold text-background" : "border-border text-muted-foreground"}`}>1</div>
                            <div className={`flex-1 h-[2px] transition-all ${step >= 2 ? "bg-gold" : "bg-border"}`} />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${step >= 2 ? "bg-gold border-gold text-background" : "border-border text-muted-foreground"}`}>2</div>
                        </div>

                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight">
                            {step === 1 ? "SIGN UP" : "YOUR DETAILS"}
                        </h1>
                        <p className="text-muted-foreground/80 font-sans text-sm uppercase tracking-wider">
                            {step === 1 ? "JOIN 50,000+ NIGERIANS USING ZIGISTER 23." : "DELIVERY ADDRESS & PAYMENT INFO — REQUIRED TO RECEIVE GIFTS."}
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-4 text-red-500">
                            <AlertCircle size={16} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    {step === 1 && (
                        <form className="space-y-5" onSubmit={handleStep1}>
                            <Field label="Full Name *" icon={<User size={14} />}>
                                <input type="text" placeholder="YOUR FULL NAME" value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
                            </Field>
                            <Field label="Email Address *" icon={null}>
                                <input type="email" placeholder="EMAIL@EXAMPLE.COM" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} />
                            </Field>
                            <Field label="Phone Number" icon={<Phone size={14} />}>
                                <input type="tel" placeholder="+234 000 000 0000" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
                            </Field>
                            <Field label="WhatsApp Number (for thank-you messages)" icon={null}>
                                <input type="tel" placeholder="+234 000 000 0000 (if different)" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className={inputCls} />
                            </Field>
                            <Field label="Password *" icon={null}>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className={`${inputCls} pr-12`} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </Field>

                            <button type="submit" className="w-full bg-gold text-background py-5 font-sans font-bold text-sm uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,168,83,0.1)] flex items-center justify-center gap-3">
                                NEXT: DELIVERY & PAYMENT <ArrowRight size={16} />
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form className="space-y-5" onSubmit={handleStep2}>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em] flex items-center gap-2"><MapPin size={12} /> Delivery Address</p>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Guests who buy gifts will deliver to this address.</p>
                            </div>
                            <Field label="Street Address *" icon={null}>
                                <input type="text" placeholder="123 LEKKI PHASE 1, LAGOS..." value={street} onChange={e => setStreet(e.target.value)} required className={inputCls} />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="City *" icon={null}>
                                    <input type="text" placeholder="LAGOS" value={city} onChange={e => setCity(e.target.value)} required className={inputCls} />
                                </Field>
                                <Field label="State *" icon={null}>
                                    <input type="text" placeholder="LAGOS STATE" value={state} onChange={e => setState(e.target.value)} required className={inputCls} />
                                </Field>
                            </div>

                            <div className="space-y-1 pt-4">
                                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.4em] flex items-center gap-2"><Building2 size={12} /> Bank Account Details</p>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">For cash fund contributions and gift payments.</p>
                            </div>
                            <Field label="Bank Name *" icon={null}>
                                <select value={bankName} onChange={e => setBankName(e.target.value)} required className={`${inputCls} appearance-none`}>
                                    <option value="">SELECT YOUR BANK</option>
                                    {["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA", "Kuda", "Opay", "Moniepoint", "Sterling Bank", "Fidelity Bank", "FCMB", "Stanbic IBTC", "Polaris Bank", "Wema Bank"].map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Account Number *" icon={null}>
                                <input type="text" placeholder="0123456789" value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} required maxLength={10} className={inputCls} />
                            </Field>
                            <Field label="Account Name *" icon={null}>
                                <input type="text" placeholder="YOUR ACCOUNT NAME" value={accountName} onChange={e => setAccountName(e.target.value)} required className={inputCls} />
                            </Field>

                            <div className="flex gap-4 pt-2">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-border py-4 text-[10px] font-bold text-foreground uppercase tracking-widest hover:bg-secondary/50 transition-all">
                                    ← BACK
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 bg-gold text-background py-4 font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 disabled:opacity-60">
                                    {loading ? "CREATING..." : "CREATE ACCOUNT →"}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 1 && (
                        <>
                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                                    <div className="relative flex justify-center text-[10px]"><span className="bg-background px-4 font-bold text-muted-foreground uppercase tracking-[0.3em]">OR CONTINUE WITH</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-3 border border-border px-6 py-4 hover:bg-secondary/50 transition-colors font-sans font-bold text-[10px] uppercase tracking-widest text-foreground/70">
                                        <Chrome size={16} /> GOOGLE
                                    </button>
                                    <button className="flex items-center justify-center gap-3 border border-border px-6 py-4 hover:bg-secondary/50 transition-colors font-sans font-bold text-[10px] uppercase tracking-widest text-foreground/70">
                                        <Apple size={16} /> APPLE
                                    </button>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 text-center">
                                <p className="text-xs font-sans font-bold text-muted-foreground uppercase tracking-widest">
                                    ALREADY HAVE AN ACCOUNT? <Link href="/login" className="text-gold hover:text-white transition-colors ml-2 underline underline-offset-4">LOG IN</Link>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const inputCls = "w-full bg-secondary/50 border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-gold outline-none text-foreground placeholder:text-muted-foreground/50 uppercase";

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold font-sans text-gold uppercase tracking-[0.3em] flex items-center gap-1">{icon}{label}</label>
            {children}
        </div>
    );
}
