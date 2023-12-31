'use client'

import {MenuContextProvider} from "@/components/context/MenuContext";
import {Toaster} from "@/components/ui/toaster";
import Navbar from "@/components/molecules/Navbar";

export default function AccountLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <MenuContextProvider>
            <section className="h-full bg-slate-100 p-8">
                <Navbar/>
                {children}
                <Toaster/>
            </section>
        </MenuContextProvider>
    )
}