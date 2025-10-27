import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOG_FILE = path.join(DATA_DIR, 'blog.json')

// S'assurer que le répertoire data existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

//initialiser le fichier blog s'il n'existe pas
if (!fs.existsSync(BLOG_FILE)) {
  const defaultArticles = [
    {
      id: '1',
      title: 'Les tendances du développement web en 2024',
      excerpt: 'Découvrez les technologies et frameworks qui façonnent l\'avenir du web development.',
      content: '<h2>Contenu de l\'article...</h2><p>À compléter depuis l\'admin</p>',
      date: '27 Oct 2024',
      readTime: '5 min',
      category: 'Web Dev',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      author: 'Développeur Full-Stack',
      published: true
    }
  ]
  fs.writeFileSync(BLOG_FILE, JSON.stringify(defaultArticles, null, 2))
}

// Vérifier l'authentification
function isAuthenticated(request: NextRequest) {
  const cookieStore = cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

// GET - Récupérer tous les articles
export async function GET() {
  try {
    const articles = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'))
    
    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
  } catch (error) {
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
    const articles = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'))
    
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
    fs.writeFileSync(BLOG_FILE, JSON.stringify(articles, null, 2))
    
    return NextResponse.json(articleWithId, { status: 201 })
  } catch (error) {
    console.error('Erreur création article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}
