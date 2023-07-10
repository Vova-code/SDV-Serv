import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'SDV Serv',
    description: 'Votre gestionnaire de machines virtuelles',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html className="h-full" lang="fr">
        <body className={`h-full ${inter.className}`}>
        {children}
        </body>
        </html>
    )
}
