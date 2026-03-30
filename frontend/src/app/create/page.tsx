"use client";

import React, { useEffect, useState } from "react";
import RegistryWizard from "@/components/create/RegistryWizard";
import { useRouter } from "next/navigation";

export default function CreateRegistryPage() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("zigster_user");
        if (!user) {
            router.push("/signup?redirectTo=/create");
        } else {
            setIsChecking(false);
        }
    }, [router]);

    if (isChecking) return null;

    return (
        <main className="min-h-screen bg-background">
            <RegistryWizard />
        </main>
    );
}
