'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface BlogArticle {
  id: string
  title: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  author: string
}

const articles: Record<string, BlogArticle> = {
  '1': {
    id: '1',
    title: 'Les tendances du développement web en 2024',
    content: `
      <h2>Introduction</h2>
      <p>Le développement web évolue rapidement, et 2024 ne fait pas exception. De nouvelles technologies émergent constamment, transformant la manière dont nous construisons et concevons des applications web.</p>
      
      <h2>1. L'essor de l'Intelligence Artificielle</h2>
      <p>L'IA s'intègre de plus en plus dans nos flux de travail. Des outils comme GitHub Copilot et ChatGPT changent la façon dont nous écrivons du code. Ces assistants IA peuvent:</p>
      <ul>
        <li>Générer du code automatiquement</li>
        <li>Détecter et corriger les bugs</li>
        <li>Suggérer des optimisations</li>
        <li>Documenter le code existant</li>
      </ul>
      
      <h2>2. Les frameworks JavaScript modernes</h2>
      <p>Next.js 14, React 18 et Svelte continuent de dominer le paysage. Ces frameworks offrent:</p>
      <ul>
        <li><strong>Server Components</strong> - Rendu côté serveur optimisé</li>
        <li><strong>Streaming SSR</strong> - Chargement progressif</li>
        <li><strong>App Router</strong> - Routing amélioré (Next.js)</li>
        <li><strong>Turbopack</strong> - Compilation ultra-rapide</li>
      </ul>
      
      <h2>3. TypeScript partout</h2>
      <p>TypeScript est devenu le standard de facto. Ses avantages:</p>
      <ul>
        <li>Typage statique pour moins d'erreurs</li>
        <li>Meilleure autocomplétion</li>
        <li>Refactoring plus sûr</li>
        <li>Documentation automatique</li>
      </ul>
      
      <h2>4. Le retour du SSR</h2>
      <p>Le Server-Side Rendering fait son grand retour grâce à:</p>
      <ul>
        <li>Meilleures performances</li>
        <li>SEO optimisé</li>
        <li>Expérience utilisateur améliorée</li>
        <li>Temps de chargement réduit</li>
      </ul>
      
      <h2>5. Web3 et Blockchain</h2>
      <p>Bien que controversé, le Web3 continue d'évoluer avec des cas d'usage de plus en plus pratiques dans les domaines de l'authentification décentralisée et des transactions sécurisées.</p>
      
      <h2>Conclusion</h2>
      <p>2024 est une année passionnante pour le développement web. En restant à jour avec ces tendances, vous pouvez créer des applications plus performantes, maintenables et agréables pour vos utilisateurs.</p>
      
      <blockquote>
        "Le seul moyen de faire du bon travail est d'aimer ce que vous faites." - Steve Jobs
      </blockquote>
    `,
    date: '27 Oct 2024',
    readTime: '5 min',
    category: 'Web Dev',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    author: 'Développeur Full-Stack'
  },
  '2': {
    id: '2',
    title: 'Pourquoi choisir Next.js pour votre prochain projet',
    content: `
      <h2>Introduction à Next.js</h2>
      <p>Next.js s'est imposé comme le framework React de référence pour construire des applications web modernes. Mais qu'est-ce qui le rend si spécial?</p>
      
      <h2>1. Performance exceptionnelle</h2>
      <p>Next.js offre des performances optimales dès le départ:</p>
      <ul>
        <li><strong>Automatic Code Splitting</strong> - Charge uniquement le code nécessaire</li>
        <li><strong>Image Optimization</strong> - Optimisation automatique des images</li>
        <li><strong>Font Optimization</strong> - Chargement intelligent des polices</li>
        <li><strong>Prefetching</strong> - Préchargement des pages pour une navigation instantanée</li>
      </ul>
      
      <h2>2. SEO-Friendly par défaut</h2>
      <p>Le rendu côté serveur (SSR) de Next.js garantit que votre contenu est indexable par les moteurs de recherche:</p>
      <ul>
        <li>Métadonnées dynamiques</li>
        <li>Sitemap automatique</li>
        <li>Robots.txt généré</li>
        <li>Open Graph et Twitter Cards</li>
      </ul>
      
      <h2>3. Developer Experience (DX)</h2>
      <p>Next.js offre une expérience développeur exceptionnelle:</p>
      <ul>
        <li>Hot Module Replacement (HMR) rapide</li>
        <li>TypeScript natif</li>
        <li>Routing basé sur les fichiers</li>
        <li>API Routes intégrées</li>
        <li>Environnements de variables faciles</li>
      </ul>
      
      <h2>4. Flexibilité du rendu</h2>
      <p>Choisissez la meilleure stratégie pour chaque page:</p>
      <ul>
        <li><strong>SSG</strong> - Static Site Generation pour le contenu statique</li>
        <li><strong>SSR</strong> - Server-Side Rendering pour le contenu dynamique</li>
        <li><strong>ISR</strong> - Incremental Static Regeneration pour le meilleur des deux</li>
        <li><strong>CSR</strong> - Client-Side Rendering quand nécessaire</li>
      </ul>
      
      <h2>5. Écosystème riche</h2>
      <p>Next.js bénéficie d'un écosystème mature:</p>
      <ul>
        <li>Vercel pour le déploiement instantané</li>
        <li>Milliers de plugins et d'extensions</li>
        <li>Documentation excellente</li>
        <li>Communauté active et réactive</li>
      </ul>
      
      <h2>Cas d'usage idéaux</h2>
      <ul>
        <li>✅ Sites e-commerce</li>
        <li>✅ Blogs et sites de contenu</li>
        <li>✅ Dashboards et applications SaaS</li>
        <li>✅ Sites marketing</li>
        <li>✅ Portfolios professionnels</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js combine performance, SEO et expérience développeur dans un package complet. C'est le choix parfait pour la majorité des projets web modernes.</p>
    `,
    date: '20 Oct 2024',
    readTime: '4 min',
    category: 'Framework',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    author: 'Développeur Full-Stack'
  },
  '3': {
    id: '3',
    title: 'Optimisation des performances web',
    content: `
      <h2>Introduction</h2>
      <p>La performance web est cruciale pour l'expérience utilisateur et le SEO. Un site rapide = plus de conversions et de satisfaction utilisateur.</p>
      
      <h2>1. Optimisation des images</h2>
      <p>Les images représentent souvent 50-70% du poids d'une page web:</p>
      <ul>
        <li><strong>Formats modernes</strong> - WebP et AVIF (jusqu'à 50% plus légers)</li>
        <li><strong>Lazy loading</strong> - Chargement différé des images hors écran</li>
        <li><strong>Responsive images</strong> - Tailles adaptées à chaque écran</li>
        <li><strong>Compression</strong> - Réduction de qualité imperceptible</li>
      </ul>
      
      <h2>2. Minification et compression</h2>
      <p>Réduisez la taille de vos fichiers:</p>
      <ul>
        <li>Minification JS/CSS (suppression espaces/commentaires)</li>
        <li>Gzip ou Brotli compression</li>
        <li>Tree shaking (suppression code non utilisé)</li>
        <li>Code splitting (division en chunks)</li>
      </ul>
      
      <h2>3. Caching stratégique</h2>
      <p>Utilisez le cache intelligemment:</p>
      <ul>
        <li><strong>Browser cache</strong> - Cache-Control headers</li>
        <li><strong>CDN</strong> - Distribution géographique</li>
        <li><strong>Service Workers</strong> - Cache offline</li>
        <li><strong>HTTP/2</strong> - Multiplexing des requêtes</li>
      </ul>
      
      <h2>4. Critical CSS</h2>
      <p>Optimisez le rendu initial:</p>
      <ul>
        <li>Inline critical CSS</li>
        <li>Defer non-critical CSS</li>
        <li>Purge CSS inutilisé</li>
        <li>Minimize render-blocking</li>
      </ul>
      
      <h2>5. JavaScript optimisé</h2>
      <ul>
        <li>Async/defer pour scripts non-critiques</li>
        <li>Décomposition en modules</li>
        <li>Utilisation de Web Workers pour calculs lourds</li>
        <li>Debounce/throttle des événements fréquents</li>
      </ul>
      
      <h2>6. Core Web Vitals</h2>
      <p>Concentrez-vous sur les métriques Google:</p>
      <ul>
        <li><strong>LCP</strong> - Largest Contentful Paint (&lt; 2.5s)</li>
        <li><strong>FID</strong> - First Input Delay (&lt; 100ms)</li>
        <li><strong>CLS</strong> - Cumulative Layout Shift (&lt; 0.1)</li>
      </ul>
      
      <h2>7. Database & API</h2>
      <ul>
        <li>Indexation des requêtes fréquentes</li>
        <li>Pagination des résultats</li>
        <li>Caching Redis/Memcached</li>
        <li>GraphQL pour requêtes précises</li>
      </ul>
      
      <h2>Outils de mesure</h2>
      <ul>
        <li>⚡ Lighthouse - Audit complet</li>
        <li>📊 PageSpeed Insights - Métriques réelles</li>
        <li>🔍 WebPageTest - Tests détaillés</li>
        <li>📈 Chrome DevTools - Profiling en direct</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>L'optimisation des performances est un processus continu. Mesurez, optimisez, testez et itérez. Chaque milliseconde compte!</p>
      
      <blockquote>
        "La performance n'est pas une feature, c'est un impératif." - Jeff Atwood
      </blockquote>
    `,
    date: '15 Oct 2024',
    readTime: '6 min',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    author: 'Développeur Full-Stack'
  }
}

export default function BlogArticle() {
  const params = useParams()
  const article = articles[params.id as string]

  if (!article) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Retour au blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
            <ArrowLeft size={20} />
            Retour au blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600 mb-8">
              <span className="flex items-center gap-2">
                <User size={18} />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {article.readTime} de lecture
              </span>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-blue max-w-none bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              lineHeight: '1.8',
            }}
          />

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 bg-blue-50 rounded-2xl border-2 border-blue-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Article utile ? Partagez-le !
            </h3>
            <p className="text-gray-700">
              N'hésitez pas à partager cet article avec votre réseau si vous l'avez trouvé intéressant.
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft size={20} />
              Tous les articles
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </article>

      {/* Styles pour le contenu HTML */}
      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #374151;
          margin-bottom: 1rem;
        }
        .prose ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          font-weight: 600;
          color: #2563eb;
        }
        .prose blockquote {
          border-left: 4px solid #2563eb;
          padding-left: 1rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
          background: #eff6ff;
          padding: 1rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </main>
  )
}
