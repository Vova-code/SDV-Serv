'use client'

import Navbar from "../../components/Navbar"

export default function AccountLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section className="h-full bg-slate-100 p-8">
            <Navbar/>
            {children}
        </section>
    )
}