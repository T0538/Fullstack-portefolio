import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = cookies().get('admin_session')
    if (session?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // IMPORTANT: Sur Netlify, l'upload de fichiers ne fonctionne pas
    // car le dossier public/ est statique (read-only après build)
    // 
    // Solution temporaire : utiliser des URLs Unsplash ou autres services
    // Solution permanente : implémenter Cloudinary, AWS S3, ou Vercel Blob
    
    if (process.env.NODE_ENV === 'production') {
      // En production (Netlify), retourner un message d'erreur informatif
      return NextResponse.json({ 
        error: 'Upload non disponible sur Netlify. Utilisez une URL externe (ex: Unsplash, Imgur) ou configurez Cloudinary/S3.',
        suggestion: 'Collez une URL d\'image directement dans le champ Image'
      }, { status: 400 })
    }

    // En développement local, sauvegarder normalement
    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-')
    const filename = `${timestamp}-${originalName}`
    
    // Créer le dossier s'il n'existe pas
    const { mkdir } = await import('fs/promises')
    const projectsDir = path.join(process.cwd(), 'public', 'projects')
    await mkdir(projectsDir, { recursive: true })
    
    // Sauvegarder dans public/projects
    const filepath = path.join(projectsDir, filename)
    await writeFile(filepath, buffer)

    // Retourner le chemin relatif
    return NextResponse.json({ path: `/projects/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
