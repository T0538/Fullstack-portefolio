'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Charger les projets depuis l'API admin
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error loading projects:', error))
  }, [])

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background - SPECTACULAIRE */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.6, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-400/15 to-blue-400/15 rounded-full blur-3xl"
        />
        
        {/* Spirale magique */}
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-4 border-cyan-400/20 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Une sélection de mes réalisations récentes démontrant mes
            compétences et ma créativité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 120
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Image Section - Plus grande */}
                <div className="relative overflow-hidden h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={800}
                    priority={index < 2}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs bg-blue-500/20 text-blue-700 rounded-full border border-blue-300 hover:bg-blue-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Github size={18} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
