'use client'

import { useState } from 'react'

interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  readTime: string
  category: string
  image: string
  author: string
  published: boolean
}

export default function BlogForm({
  article,
  onClose,
  onSave,
}: {
  article: BlogArticle | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    readTime: article?.readTime || '5 min',
    category: article?.category || 'Web Dev',
    image: article?.image || '',
    author: article?.author || 'Développeur Full-Stack',
    published: article?.published ?? true
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

    const url = article
      ? `/api/blog/${article.id}`
      : '/api/blog'
    
    const method = article ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="glass rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {article ? 'Modifier l\'article' : 'Nouvel article'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
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
              <label className="block text-white font-medium mb-2">Catégorie</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="Web Dev, Framework, etc."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Extrait (résumé)</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 resize-none"
              placeholder="Court résumé de l'article..."
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Contenu (HTML supporté)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 resize-none font-mono text-sm"
              placeholder="<h2>Titre</h2><p>Paragraphe...</p>"
              required
            />
            <p className="text-gray-400 text-xs mt-1">
              Utilisez du HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;blockquote&gt;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Temps de lecture</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="5 min"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Auteur</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Image de couverture</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/photo-xxx ou URL de votre image"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 mb-2"
            />
            <details className="text-gray-400 text-xs">
              <summary className="cursor-pointer hover:text-white">Ou uploader un fichier (local uniquement)</summary>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary-500 file:text-white hover:file:bg-primary-600 mt-2"
              />
              <p className="text-yellow-400 mt-1">⚠️ Upload fichier non disponible sur Netlify</p>
            </details>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 rounded object-cover" />
            )}
            {uploading && <p className="text-primary-400 mt-2">Upload en cours...</p>}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 bg-white/5 border border-white/10 rounded focus:ring-primary-500"
            />
            <label htmlFor="published" className="text-white font-medium">
              Publier l'article
            </label>
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
              {article ? 'Mettre à jour' : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
