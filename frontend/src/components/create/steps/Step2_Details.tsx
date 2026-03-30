"use client";

import React from "react";

const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu", "Benin City", "Other"];

export default function Step2_Details({
    data,
    updateData
}: {
    data: any,
    updateData: (fields: any) => void
}) {
    return (
        <div className="space-y-12 max-w-2xl mx-auto">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight">TELL US MORE</h2>
                <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em]">LET'S ADD THE BASICS TO YOUR REGISTRY.</p>
            </div>

            <div className="space-y-8 bg-secondary/30 p-10 border border-border mt-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Registry Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => updateData({ title: e.target.value })}
                        placeholder="E.G. MY GRADUATION REGISTRY"
                        className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Event Date</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => updateData({ date: e.target.value })}
                            className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Location (City)</label>
                        <select
                            value={data.location}
                            onChange={(e) => updateData({ location: e.target.value })}
                            className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase appearance-none"
                        >
                            <option value="">SELECT CITY</option>
                            {cities.map(city => <option key={city} value={city}>{city.toUpperCase()}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Owner(s) Full Name</label>
                    <input
                        type="text"
                        value={data.ownerName}
                        onChange={(e) => updateData({ ownerName: e.target.value })}
                        placeholder="E.G. YOUR FULL NAME"
                        className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                    />
                </div>
            </div>
        </div>
    );
}
