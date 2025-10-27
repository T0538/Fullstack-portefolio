import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const BLOG_FILE = path.join(process.cwd(), 'data', 'blog.json')

// Vérifier l'authentification
function isAuthenticated(request: NextRequest) {
  const cookieStore = cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

// GET - Récupérer un article spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'))
    const article = articles.find((a: any) => a.id === params.id)
    
    if (!article) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
    }
    
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT - Modifier un article (authentification requise)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const updatedArticle = await request.json()
    const articles = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'))
    
    const index = articles.findIndex((a: any) => a.id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
    }
    
    articles[index] = { ...articles[index], ...updatedArticle }
    fs.writeFileSync(BLOG_FILE, JSON.stringify(articles, null, 2))
    
    return NextResponse.json(articles[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la modification' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un article (authentification requise)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const articles = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'))
    const filteredArticles = articles.filter((a: any) => a.id !== params.id)
    
    fs.writeFileSync(BLOG_FILE, JSON.stringify(filteredArticles, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
