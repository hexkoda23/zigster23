"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Apple, Home, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate auth: check localStorage user OR accept any credentials
        setTimeout(() => {
            const savedUser = localStorage.getItem("zigster_user");
            if (savedUser) {
                const user = JSON.parse(savedUser);
                if (user.email === email || email.length > 0) {
                    // Accept login
                    localStorage.setItem("zigster_session", JSON.stringify({ loggedIn: true, email, name: user.name || "User" }));
                    const params = new URLSearchParams(window.location.search);
                    router.push(params.get("redirectTo") || "/dashboard");
                    return;
                }
            }
            // No user registered yet — still let them in for demo
            if (email && password) {
                localStorage.setItem("zigster_session", JSON.stringify({ loggedIn: true, email, name: email.split("@")[0] }));
                localStorage.setItem("zigster_user", JSON.stringify({ name: email.split("@")[0], email }));
                router.push("/dashboard");
            } else {
                setError("Please enter your email and password.");
                setLoading(false);
            }
        }, 600);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Image Side */}
            <div className="hidden lg:block relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                    alt="Luxury Wedding"
                    className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                <div className="absolute bottom-20 left-20 right-20 space-y-6">
                    <div className="w-12 h-[2px] bg-gold" />
                    <h2 className="text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                        WELCOME BACK TO <br />
                        <span className="text-gold">ZIGISTER 23.</span>
                    </h2>
                    <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.3em] max-w-sm">
                        Manage your gift registry and track purchases seamlessly.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="w-full max-w-md space-y-12 relative z-10">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-xs font-bold font-sans uppercase tracking-widest mb-8">
                            <Home size={14} /> BACK TO HOME
                        </Link>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight">LOG IN</h1>
                        <p className="text-muted-foreground/80 font-sans text-sm uppercase tracking-wider">
                            ENTER YOUR DETAILS TO ACCESS YOUR REGISTRY.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-4 text-red-500">
                                <AlertCircle size={16} />
                                <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold font-sans text-gold uppercase tracking-[0.3em]">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EMAIL@EXAMPLE.COM"
                                required
                                className="w-full bg-secondary/50 border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-gold outline-none text-foreground placeholder:text-muted-foreground/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold font-sans text-gold uppercase tracking-[0.3em]">Password</label>
                                <button type="button" className="text-[10px] font-bold font-sans text-muted-foreground hover:text-gold uppercase tracking-[0.2em] transition-colors">Forgot?</button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-secondary/50 border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-gold outline-none text-foreground pr-12 placeholder:text-muted-foreground/50"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold text-background py-5 font-sans font-bold text-sm uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,168,83,0.1)] mt-4 disabled:opacity-60"
                        >
                            {loading ? "SIGNING IN..." : "SIGN IN TO ACCOUNT"}
                        </button>
                    </form>

                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
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

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-xs font-sans font-bold text-muted-foreground uppercase tracking-widest">
                            NEW TO ZIGISTER 23? <Link href="/signup" className="text-gold hover:text-white transition-colors ml-2 underline underline-offset-4">CREATE ACCOUNT</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
