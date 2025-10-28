import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOG_FILE = path.join(DATA_DIR, 'blog.json')

// Fonction pour lire les articles
async function readArticles() {
  try {
    const data = await fs.readFile(BLOG_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si le fichier n'existe pas, retourner un tableau vide
    return []
  }
}

// Fonction pour écrire les articles
async function writeArticles(articles: any[]) {
  try {
    // Créer le dossier data s'il n'existe pas
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(BLOG_FILE, JSON.stringify(articles, null, 2))
  } catch (error) {
    console.error('Error writing articles:', error)
    throw error
  }
}

// Vérifier l'authentification
function isAuthenticated(request: NextRequest) {
  const cookieStore = cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

// GET - Récupérer tous les articles
export async function GET() {
  try {
    const articles = await readArticles()
    
    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Error in GET /api/blog:', error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST - Créer un nouvel article (authentification requise)
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const newArticle = await request.json()
    const articles = await readArticles()
    
    // Générer un ID unique
    const id = Date.now().toString()
    const articleWithId = {
      ...newArticle,
      id,
      date: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    }
    
    articles.push(articleWithId)
    await writeArticles(articles)
    
    return NextResponse.json(articleWithId, { status: 201 })
  } catch (error) {
    console.error('Erreur création article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}
