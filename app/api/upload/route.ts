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

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-')
    const filename = `${timestamp}-${originalName}`
    
    // Sauvegarder dans public/projects
    const filepath = path.join(process.cwd(), 'public', 'projects', filename)
    await writeFile(filepath, buffer)

    // Retourner le chemin relatif
    return NextResponse.json({ path: `/projects/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
