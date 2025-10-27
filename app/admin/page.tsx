'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Précharger la page dashboard pour une navigation instantanée
  useEffect(() => {
    router.prefetch('/admin/dashboard')
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        // Utiliser replace pour une navigation plus rapide
        router.replace('/admin/dashboard')
      } else {
        setError('Mot de passe incorrect')
        setLoading(false)
      }
    } catch (err) {
      setError('Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary-500/20 rounded-full">
            <Lock size={32} className="text-primary-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Accès réservé à l'administrateur
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-white font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Entrez le mot de passe admin"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 shadow-lg shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Mot de passe par défaut : <code className="text-primary-400">admin123</code>
        </p>
      </div>
    </div>
  )
}
