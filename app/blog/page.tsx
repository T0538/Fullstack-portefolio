'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
}

export default function Blog() {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Les tendances du développement web en 2024',
      excerpt: 'Découvrez les technologies et frameworks qui façonnent l\'avenir du web development.',
      date: '27 Oct 2024',
      readTime: '5 min',
      category: 'Web Dev',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
    },
    {
      id: '2',
      title: 'Pourquoi choisir Next.js pour votre prochain projet',
      excerpt: 'Les avantages de Next.js pour créer des applications web performantes et SEO-friendly.',
      date: '20 Oct 2024',
      readTime: '4 min',
      category: 'Framework',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
    },
    {
      id: '3',
      title: 'Optimisation des performances web',
      excerpt: 'Techniques et bonnes pratiques pour améliorer la vitesse de chargement de vos sites.',
      date: '15 Oct 2024',
      readTime: '6 min',
      category: 'Performance',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
            ← Retour au portfolio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog <span className="gradient-text">Tech</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mes réflexions, tutoriels et partages d'expérience sur le développement web
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
                  >
                    Lire l'article
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-blue-800 text-lg font-semibold mb-2">
                📝 Plus d'articles bientôt !
              </p>
              <p className="text-blue-600">
                Le blog est en cours de développement. De nouveaux articles seront publiés régulièrement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
