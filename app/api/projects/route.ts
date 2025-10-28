import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const projectsFile = path.join(process.cwd(), 'data', 'projects.json')

async function readProjects() {
  try {
    const data = await fs.readFile(projectsFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si le fichier n'existe pas, retourner un tableau vide
    return []
  }
}

async function writeProjects(projects: any[]) {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error('Error writing projects:', error)
    throw error
  }
}

// GET - Récupérer tous les projets
export async function GET() {
  try {
    const projects = await readProjects()
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      }
    })
  } catch (error) {
    console.error('Error in GET /api/projects:', error)
    // Retourner un tableau vide en cas d'erreur
    return NextResponse.json([])
  }
}

// POST - Créer un nouveau projet
export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = cookies().get('admin_session')
    if (session?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newProject = await request.json()
    const projects = await readProjects()

    // Générer un ID unique
    const id = Date.now().toString()
    const projectWithId = { id, ...newProject }

    projects.push(projectWithId)
    await writeProjects(projects)

    return NextResponse.json(projectWithId)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 })
  }
}
