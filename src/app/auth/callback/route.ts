import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest) {
    const code = new URL(req.url).searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL('/account', req.url))
}