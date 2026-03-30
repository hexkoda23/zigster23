"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Search, Bell, User } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState("USER");

    useEffect(() => {
        const registry = localStorage.getItem("zigster_registry");
        const user = localStorage.getItem("zigster_user");
        if (registry) {
            const data = JSON.parse(registry);
            if (data.ownerName) setName(data.ownerName);
        } else if (user) {
            const data = JSON.parse(user);
            if (data.name) setName(data.name);
        }
    }, []);

    return (
        <div className="flex bg-background min-h-screen text-foreground font-sans overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-white z-20">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="text-foreground hover:text-primary transition-colors">
                            <Menu size={24} />
                        </button>
                        <span className="text-xl font-serif font-bold tracking-tight text-foreground uppercase">Z23</span>
                    </div>

                    <div className="flex-1 max-w-xl hidden md:flex items-center gap-3 bg-secondary/20 border border-border px-4 py-2 rounded-sm group hover:border-primary/30 transition-all duration-500">
                        <Search size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH GIFTS, PURCHASES, OR FUNDS..."
                            className="bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest text-foreground w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-muted-foreground hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-[1px] bg-border" />
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">{name}</p>
                                <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] opacity-60">REGISTRY OWNER</p>
                            </div>
                            <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center rounded-full group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
                                <User size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid / Content Area */}
                <main className="flex-1 overflow-y-auto bg-background p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
