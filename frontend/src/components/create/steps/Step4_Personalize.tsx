"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, Globe, Link, Lock, ShieldCheck } from "lucide-react";

export default function Step4_Personalize({
    data,
    updateData
}: {
    data: any,
    updateData: (fields: any) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (data.photo) {
            setPreviewUrl(data.photo);
        }
    }, [data.photo]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreviewUrl(result);
                updateData({ photo: result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-12 max-w-2xl mx-auto">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight">MAKE IT YOURS</h2>
                <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em]">ADD A PERSONAL TOUCH AND SET YOUR PRIVACY.</p>
            </div>

            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Event Photo</label>
                        <div
                            className="aspect-square bg-white border border-dashed border-border flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary transition-colors shadow-sm relative overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {previewUrl ? (
                                <img src={previewUrl} alt="Event Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <Camera size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold font-sans text-muted-foreground uppercase tracking-widest">Upload Photo</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Greeting Message</label>
                            <textarea
                                rows={6}
                                value={data.greeting}
                                onChange={(e) => updateData({ greeting: e.target.value })}
                                placeholder="WELCOME FRIENDS AND FAMILY..."
                                className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6 mt-10">
                    <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em] block">Privacy Settings</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: "public", icon: Globe, label: "Public", desc: "Searchable by name or username." },
                            { id: "link-only", icon: Link, label: "Link Only", desc: "Only people with your link can view." },
                            { id: "private", icon: Lock, label: "Private", desc: "Password required to view registry." }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => updateData({ privacy: option.id })}
                                className={`p-6 text-left border flex flex-col gap-4 transition-all duration-500 rounded-sm ${data.privacy === option.id ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-border text-foreground hover:border-primary/50"
                                    }`}
                            >
                                <div className={`transition-colors duration-500 ${data.privacy === option.id ? "text-white" : "text-primary"}`}>
                                    <option.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm uppercase tracking-tight">{option.label}</h4>
                                    <p className={`text-[9px] font-sans leading-relaxed mt-1 ${data.privacy === option.id ? "text-white/70" : "text-muted-foreground"}`}>
                                        {option.desc}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
