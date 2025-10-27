import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mot de passe admin (changez-le!)
const ADMIN_PASSWORD = 'admin123'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Créer une session simple avec un cookie
      const cookieStore = cookies()
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      })

      // Réponse immédiate
      return NextResponse.json({ success: true }, { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      })
    }

    // Petit délai artificiel pour éviter les attaques par force brute
    await new Promise(resolve => setTimeout(resolve, 500))
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Désactiver le cache Next.js
export const dynamic = 'force-dynamic'
