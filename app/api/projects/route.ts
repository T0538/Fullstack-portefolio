import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const projectsFile = path.join(process.cwd(), 'data', 'projects.json')

async function readProjects() {
  const data = await fs.readFile(projectsFile, 'utf-8')
  return JSON.parse(data)
}

async function writeProjects(projects: any[]) {
  await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2))
}

// GET - Récupérer tous les projets
export async function GET() {
  try {
    const projects = await readProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Error reading projects' }, { status: 500 })
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
