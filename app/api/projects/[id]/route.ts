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

// PUT - Mettre à jour un projet
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = cookies().get('admin_session')
    if (session?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedData = await request.json()
    const projects = await readProjects()

    const index = projects.findIndex((p: any) => p.id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...updatedData }
    await writeProjects(projects)

    return NextResponse.json(projects[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 })
  }
}

// DELETE - Supprimer un projet
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = cookies().get('admin_session')
    if (session?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await readProjects()
    const filteredProjects = projects.filter((p: any) => p.id !== params.id)

    if (filteredProjects.length === projects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await writeProjects(filteredProjects)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 })
  }
}
