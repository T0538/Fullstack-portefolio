'use client'

import { motion } from 'framer-motion'
import { Sparkles, Coffee, Lightbulb } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Skills() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    setParticles(
      [...Array(8)].map(() => ({
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
      }))
    )
  }, [])

  const skillCategories = [
    {
      name: 'Création d\'interfaces',
      emoji: '🎨',
      icon: <Sparkles size={24} />,
      description: 'Je donne vie aux idées avec des interfaces élégantes',
      skills: ['React & Next.js', 'TypeScript', 'TailwindCSS', 'Vue.js'],
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30',
      bgImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    },
    {
      name: 'Côté serveur',
      emoji: '⚙️',
      icon: <Coffee size={24} />,
      description: 'Construction de bases solides pour vos applications',
      skills: ['Node.js & Express', 'Python & Django', 'PostgreSQL & MongoDB', 'API REST & GraphQL'],
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30',
      bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    },
    {
      name: 'Déploiement & Outils',
      emoji: '🚀',
      icon: <Lightbulb size={24} />,
      description: 'Automatisation et mise en production fluide',
      skills: ['Docker & Kubernetes', 'Git & GitHub', 'CI/CD', 'AWS & Vercel'],
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30',
      bgImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Animated Decorative elements - ÉNORMES */}
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 60, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{
          scale: [1.3, 1, 1.3],
          y: [0, -80, 0],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-purple-500/15 rounded-full blur-3xl" 
      />
      
      {/* Orbes supplémentaires magiques */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl"
      />
      
      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-4 text-6xl"
          >
            💻
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ce que j'aime <span className="gradient-text">créer</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Passionné par le développement, je transforme des lignes de code en expériences qui comptent. 
            Voici mes outils préférés pour construire des projets innovants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: categoryIndex * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                transition: { duration: 0.4, ease: 'easeOut' } 
              }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full rounded-3xl overflow-hidden transition-all duration-500">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.bgImage}')` }}
                />
                
                {/* Overlay - Plus transparent au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95 group-hover:from-slate-900/85 group-hover:via-blue-900/75 group-hover:to-slate-900/85 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col">
                  {/* Icon & Emoji */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl drop-shadow-lg"
                    >
                      {category.emoji}
                    </motion.div>
                    <div className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>

                  {/* Skills as Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.1 }}
                        className="px-4 py-2 bg-white/5 group-hover:bg-white/15 text-white text-sm rounded-full backdrop-blur-md transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal touch */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 italic text-lg">
            "La technologie est mon outil, mais l'humain reste au centre de chaque projet" 🌟
          </p>
        </motion.div>
      </div>
    </section>
  )
}
