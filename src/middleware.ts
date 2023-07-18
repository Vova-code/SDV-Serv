import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data
    } = await supabase.auth.getSession();

    const session = data.session;

    // if user is signed in and the current path is / redirect the user to /account
    if (session && req.nextUrl.pathname === '/') {
        console.log("Session: ", data.session);
        return NextResponse.redirect(new URL('/account', req.url))
    }

    // if user is not signed in and the current path is not / redirect the user to /
    if (!session && req.nextUrl.pathname !== '/') {
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/account'],
}