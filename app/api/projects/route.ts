import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const projectsFile = path.join(process.cwd(), 'data', 'projects.json')

// Projets par défaut (utilisés sur Netlify où le système de fichiers est read-only)
const DEFAULT_PROJECTS = [
  {
    "id": "1",
    "title": "MoviesZone - Streaming Platform",
    "description": "Plateforme de streaming moderne pour films et séries en HD. Interface élégante avec recherche avancée, filtres par genre, et lecteur vidéo intégré.",
    "image": "/projects/1761602467250-Capture-d'écran-2025-10-27-020251.png",
    "tags": ["React", "Vite", "TailwindCSS", "API REST"],
    "github": "https://moviezo.netlify.app/browse",
    "demo": "https://moviezo.netlify.app/browse"
  },
  {
    "id": "1761533018284",
    "title": "Sorbo-Ingenierie",
    "description": "Sorbo-Ingénierie est un bureau d'études en génie civil basé à Abidjan qui réalise des études et suivis de travaux (topographie, SIG, infrastructures et voirie), développe des logiciels spécialisés (ex. OH-Route) et propose des formations techniques (AutoCAD, Covadis, Revit, etc.).",
    "image": "/projects/1761602504790-Capture-d'écran-2025-10-27-024134.png",
    "tags": ["React", "HTML/CSS", "JavaScript"],
    "github": "https://sorbo-ingenierie.ci/",
    "demo": "https://sorbo-ingenierie.ci/"
  },
  {
    "id": "1761604674156",
    "title": "Plateforme SaaS QHSE",
    "description": "Plateforme SaaS professionnelle pour la gestion de la Qualité, Hygiène, Sécurité et Environnement. Simplifiez, automatisez et optimisez vos processus QHSE.",
    "image": "/projects/1761604576817-Capture-d'écran-2025-10-27-223508.png",
    "tags": ["React", "Next.js"],
    "github": "https://qhse-enterprise.netlify.app/",
    "demo": "https://qhse-enterprise.netlify.app/"
  }
]

async function readProjects() {
  // Sur Netlify (production), utiliser les projets par défaut
  if (process.env.NODE_ENV === 'production') {
    return DEFAULT_PROJECTS
  }
  
  // En local, essayer de lire le fichier
  try {
    const data = await fs.readFile(projectsFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si le fichier n'existe pas, retourner les projets par défaut
    return DEFAULT_PROJECTS
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
