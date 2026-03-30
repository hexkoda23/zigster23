"use client";

import React, { useState, useEffect } from "react";
import {
    User, Lock, Bell, Shield, Users, Trash2, ChevronRight, CreditCard, Smartphone, Building2, Eye, EyeOff, CheckCircle2, MapPin
} from "lucide-react";

type TabId = "registry" | "payment" | "privacy" | "notifications" | "access" | "mobile";

export default function SettingsTab() {
    const [activeTab, setActiveTab] = useState<TabId>("registry");

    // Registry Profile
    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [username, setUsername] = useState("");
    const [registryType, setRegistryType] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    // Payment Settings
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");

    // Delivery Address
    const [address, setAddress] = useState("");

    // Notifications
    const [notifWhatsApp, setNotifWhatsApp] = useState(true);
    const [notifEmail, setNotifEmail] = useState(true);
    const [autoThank, setAutoThank] = useState(false);

    // Privacy
    const [isPublic, setIsPublic] = useState(true);
    const [showPrices, setShowPrices] = useState(true);

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        const reg = localStorage.getItem("zigster_registry");
        if (reg) {
            const d = JSON.parse(reg);
            setTitle(d.title || "");
            setEventDate(d.eventDate || "");
            setUsername(d.username || "");
            setRegistryType(d.type || "Wedding Registry");
            setWelcomeMessage(d.welcomeMessage || "");
            if (d.bankDetails) {
                setBankName(d.bankDetails.bankName || "");
                setAccountNumber(d.bankDetails.accountNumber || "");
                setAccountName(d.bankDetails.accountName || "");
            }
            if (d.address) {
                setAddress(d.address);
            }
            if (d.privacy) {
                setIsPublic(d.privacy.isPublic !== false);
                setShowPrices(d.privacy.showPrices !== false);
            }
        }
        const prefs = localStorage.getItem("zigster_prefs");
        if (prefs) {
            const p = JSON.parse(prefs);
            setNotifWhatsApp(p.notifWhatsApp !== false);
            setNotifEmail(p.notifEmail !== false);
            setAutoThank(p.autoThank || false);
        }
    }, []);

    const save = () => {
        setIsSaving(true);
        const reg = localStorage.getItem("zigster_registry");
        const d = reg ? JSON.parse(reg) : {};
        localStorage.setItem("zigster_registry", JSON.stringify({
            ...d,
            title, eventDate, username,
            type: registryType,
            welcomeMessage,
            bankDetails: { bankName, accountNumber, accountName },
            address,
            privacy: { isPublic, showPrices },
        }));
        const prefs = localStorage.getItem("zigster_prefs");
        const p = prefs ? JSON.parse(prefs) : {};
        localStorage.setItem("zigster_prefs", JSON.stringify({ ...p, notifWhatsApp, notifEmail, autoThank }));
        window.dispatchEvent(new Event("registryUpdate"));
        setTimeout(() => {
            setIsSaving(false);
            setSaveMessage("SETTINGS SAVED ✓");
            setTimeout(() => setSaveMessage(""), 3000);
        }, 500);
    };

    const navItems: { id: TabId; label: string; icon: any }[] = [
        { id: "registry", label: "Registry Profile", icon: User },
        { id: "payment", label: "Payment Settings", icon: CreditCard },
        { id: "privacy", label: "Privacy & Security", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "access", label: "Co-Owner Access", icon: Users },
        { id: "mobile", label: "Mobile App", icon: Smartphone },
    ];

    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Nav */}
                <div className="lg:col-span-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-sm transition-all duration-300 group ${activeTab === item.id ? "bg-primary text-white font-bold shadow-lg shadow-primary/10" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}
                        >
                            <item.icon size={18} className={activeTab === item.id ? "" : "text-primary group-hover:text-primary/70"} />
                            <span className="text-xs font-sans uppercase tracking-[0.2em]">{item.label}</span>
                            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* REGISTRY PROFILE */}
                    {activeTab === "registry" && (
                        <div className="glass p-10 border-border space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground uppercase">Registry Profile</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Update your public registry title and details.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SettingField label="Registry Title">
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="YOUR REGISTRY TITLE" className={inp} />
                                </SettingField>
                                <SettingField label="Event Date">
                                    <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className={inp} />
                                </SettingField>
                                <SettingField label="Username (URL)">
                                    <div className="flex bg-secondary/30 border border-border items-center">
                                        <span className="pl-4 text-muted-foreground text-[10px]">/</span>
                                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="your-registry-url" className="flex-1 bg-transparent px-2 py-4 text-xs tracking-widest outline-none text-foreground lowercase" />
                                    </div>
                                </SettingField>
                                <SettingField label="Registry Type">
                                    <select value={registryType} onChange={e => setRegistryType(e.target.value)} className={`${inp} appearance-none`}>
                                        <option>Wedding Registry</option>
                                        <option>Baby Shower</option>
                                        <option>Birthday</option>
                                        <option>House Warming</option>
                                        <option>Graduation</option>
                                    </select>
                                </SettingField>
                            </div>
                            <SettingField label="Welcome Message">
                                <textarea rows={4} value={welcomeMessage} onChange={e => setWelcomeMessage(e.target.value)} className={`${inp} resize-none`} />
                            </SettingField>
                            <SaveBar saving={isSaving} msg={saveMessage} onSave={save} />
                        </div>
                    )}

                    {/* PAYMENT SETTINGS */}
                    {activeTab === "payment" && (
                        <div className="space-y-6">
                            <div className="glass p-10 border-border space-y-8">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-foreground uppercase flex items-center gap-3"><Building2 size={20} className="text-primary" /> Bank Account Details</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Your guests will transfer gift payments to this account.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SettingField label="Bank Name *">
                                        <select value={bankName} onChange={e => setBankName(e.target.value)} className={`${inp} appearance-none`}>
                                            <option value="">SELECT BANK</option>
                                            {["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA", "Kuda", "Opay", "Moniepoint", "Sterling Bank", "Fidelity Bank", "FCMB", "Stanbic IBTC", "Polaris Bank", "Wema Bank"].map(b => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                    </SettingField>
                                    <SettingField label="Account Number *">
                                        <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="0123456789" maxLength={10} className={inp} />
                                    </SettingField>
                                </div>
                                <SettingField label="Account Name *">
                                    <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="YOUR ACCOUNT NAME" className={inp} />
                                </SettingField>

                                {bankName && accountNumber && accountName && (
                                    <div className="bg-primary/5 border border-primary/20 p-5 space-y-3">
                                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={12} /> Preview — What guests see</p>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest">Bank</span>
                                            <span className="font-bold text-foreground">{bankName}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest">Account</span>
                                            <span className="text-xl font-serif font-bold text-primary">{accountNumber}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest">Name</span>
                                            <span className="font-bold text-foreground">{accountName}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="glass p-10 border-border space-y-8">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-foreground uppercase flex items-center gap-3"><MapPin size={20} className="text-primary" /> Delivery Address</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Guests who purchase gifts will deliver to this address.</p>
                                </div>
                                <SettingField label="Full Delivery Address">
                                    <textarea
                                        rows={3}
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="123 LEKKI PHASE 1, LAGOS..."
                                        className={`${inp} resize-none`}
                                    />
                                </SettingField>
                            </div>
                            <SaveBar saving={isSaving} msg={saveMessage} onSave={save} />
                        </div>
                    )}

                    {/* PRIVACY */}
                    {activeTab === "privacy" && (
                        <div className="glass p-10 border-border space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground uppercase">Privacy & Security</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Control who can see your registry.</p>
                            </div>
                            <div className="space-y-6">
                                <Toggle label="Registry Visible to Public" description="Anyone with your link can view your registry." value={isPublic} onChange={setIsPublic} />
                                <Toggle label="Show Gift Prices" description="Display prices on your public registry page." value={showPrices} onChange={setShowPrices} />
                            </div>
                            <SaveBar saving={isSaving} msg={saveMessage} onSave={save} />
                        </div>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeTab === "notifications" && (
                        <div className="glass p-10 border-border space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground uppercase">Notifications</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Choose how you get notified about purchases.</p>
                            </div>
                            <div className="space-y-6">
                                <Toggle label="WhatsApp Notifications" description="Get a WhatsApp message when someone buys a gift." value={notifWhatsApp} onChange={setNotifWhatsApp} />
                                <Toggle label="Email Notifications" description="Get an email when someone makes a payment." value={notifEmail} onChange={setNotifEmail} />
                                <Toggle label="Auto Thank-You Messages" description="Automatically send a thank-you WhatsApp to guests after purchase." value={autoThank} onChange={setAutoThank} />
                            </div>
                            <SaveBar saving={isSaving} msg={saveMessage} onSave={save} />
                        </div>
                    )}

                    {/* CO-OWNER ACCESS */}
                    {activeTab === "access" && (
                        <div className="glass p-10 border-border space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground uppercase">Co-Owner Access</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Invite a partner to co-manage your registry.</p>
                            </div>
                            <div className="space-y-4">
                                <SettingField label="Co-Owner Email">
                                    <input type="email" placeholder="PARTNER@EXAMPLE.COM" className={inp} />
                                </SettingField>
                                <button className="bg-primary text-white px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-all">
                                    SEND INVITE →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* MOBILE */}
                    {activeTab === "mobile" && (
                        <div className="glass p-10 border-border space-y-8 text-center">
                            <Smartphone size={48} className="text-primary/30 mx-auto" />
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground uppercase">Mobile App</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">The Zigister 23 mobile app is coming soon to iOS and Android.</p>
                            </div>
                            <button className="bg-primary text-white px-10 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-all opacity-60 cursor-not-allowed">
                                NOTIFY ME WHEN AVAILABLE
                            </button>
                        </div>
                    )}

                    {/* Danger Zone */}
                    <div className="bg-red-500/5 p-10 border border-red-500/10 space-y-6">
                        <div className="flex items-center gap-4 text-red-500">
                            <Shield size={20} />
                            <h3 className="text-sm font-serif font-bold uppercase">DANGER ZONE</h3>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
                                DELETING YOUR REGISTRY WILL REMOVE ALL GIFTS, CONTRIBUTIONS, AND DATA. THIS ACTION IS IRREVERSIBLE.
                            </p>
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure? This will delete all your registry data.")) {
                                        ["zigster_registry", "zigster_gifts", "zigster_funds", "zigster_purchases"].forEach(k => localStorage.removeItem(k));
                                        window.location.href = "/";
                                    }
                                }}
                                className="border border-red-500/20 text-red-500 px-6 py-3 font-sans font-bold text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all whitespace-nowrap"
                            >
                                <Trash2 size={14} className="inline mr-2" /> DELETE REGISTRY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const inp = "w-full bg-secondary/30 border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase";

function SettingField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-bold text-primary uppercase tracking-[0.3em]">{label}</label>
            {children}
        </div>
    );
}

function Toggle({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-center justify-between gap-6 py-4 border-b border-border last:border-0">
            <div>
                <p className="text-xs font-bold text-foreground uppercase tracking-tight">{label}</p>
                <p className="text-[9px] text-muted-foreground mt-1">{description}</p>
            </div>
            <button onClick={() => onChange(!value)} className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${value ? "bg-primary" : "bg-secondary border border-border"}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "left-7" : "left-1"}`} />
            </button>
        </div>
    );
}

function SaveBar({ saving, msg, onSave }: { saving: boolean; msg: string; onSave: () => void }) {
    return (
        <div className="pt-6 border-t border-border flex justify-between items-center">
            {msg ? <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{msg}</span> : <div />}
            <button onClick={onSave} disabled={saving} className="bg-primary text-white px-10 py-4 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all shadow-lg shadow-primary/10 disabled:opacity-50">
                {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
        </div>
    );
}
