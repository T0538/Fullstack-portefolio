'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, ExternalLink, BookOpen, FolderKanban } from 'lucide-react'
import BlogForm from './BlogForm'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
}

interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  author: string
  published: boolean
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Charger auth, projets et articles en parallèle
    Promise.all([checkAuth(), loadProjects(), loadArticles()])
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check', {
        cache: 'no-store'
      })
      if (!res.ok) {
        router.replace('/admin')
      }
    } catch (error) {
      router.replace('/admin')
    }
  }

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects', {
        cache: 'no-store'
      })
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  const loadArticles = async () => {
    try {
      const res = await fetch('/api/blog', {
        cache: 'no-store'
      })
      const data = await res.json()
      setArticles(data)
    } catch (error) {
      console.error('Error loading articles:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) return

    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    loadProjects()
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return

    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    loadArticles()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Gérez votre portfolio et blog</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderKanban size={20} />
            Projets ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
              activeTab === 'blog'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            Blog ({articles.length})
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={() => {
            if (activeTab === 'projects') {
              setEditingProject(null)
              setShowForm(true)
            } else {
              setEditingArticle(null)
              setShowBlogForm(true)
            }
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mb-8 shadow-lg shadow-primary-500/50"
        >
          <Plus size={20} />
          {activeTab === 'projects' ? 'Ajouter un projet' : 'Nouvel article'}
        </button>

        {/* Projects Grid */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl overflow-hidden">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-primary-500/20 text-primary-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(project)
                      setShowForm(true)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                  >
                    <Edit size={16} />
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Blog Articles Grid */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="glass rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingArticle(article)
                        setShowBlogForm(true)
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                    >
                      <Edit size={16} />
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <ProjectForm
            project={editingProject}
            onClose={() => {
              setShowForm(false)
              setEditingProject(null)
            }}
            onSave={() => {
              loadProjects()
              setShowForm(false)
              setEditingProject(null)
            }}
          />
        )}

        {/* Blog Form Modal */}
        {showBlogForm && (
          <BlogForm
            article={editingArticle}
            onClose={() => {
              setShowBlogForm(false)
              setEditingArticle(null)
            }}
            onSave={() => {
              loadArticles()
              setShowBlogForm(false)
              setEditingArticle(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

function ProjectForm({
  project,
  onClose,
  onSave,
}: {
  project: Project | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    tags: project?.tags.join(', ') || '',
    github: project?.github || '#',
    demo: project?.demo || '#',
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setFormData((prev) => ({ ...prev, image: data.path }))
    } catch (error) {
      alert('Erreur lors de l\'upload')
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()),
    }

    const url = project
      ? `/api/projects/${project.id}`
      : '/api/projects'
    
    const method = project ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })

    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="glass rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {project ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Titre</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">URL de l'image</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://i.imgur.com/xxxxx.jpg"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 mb-2"
              required
            />
            <p className="text-gray-400 text-xs mb-2">
              💡 Utilisez <a href="https://imgur.com" target="_blank" className="text-primary-400 hover:underline">Imgur</a> ou <a href="https://unsplash.com" target="_blank" className="text-primary-400 hover:underline">Unsplash</a> pour héberger vos images
            </p>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 rounded object-cover" onError={(e) => {
                e.currentTarget.style.display = 'none'
              }} />
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Technologies (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="React, Next.js, TailwindCSS"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Lien GitHub</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Lien Demo</label>
            <input
              type="url"
              value={formData.demo}
              onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/50"
            >
              {project ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
