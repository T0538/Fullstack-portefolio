'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    // Générer les positions des particules côté client uniquement
    setParticles(
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    )
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Dynamic Modern Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Floating Geometric Shapes - AGRANDIES */}
        <motion.div
          animate={{
            y: [0, -60, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-[10%] w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 border-2 sm:border-4 border-blue-400/40 rounded-3xl backdrop-blur-md shadow-2xl shadow-blue-500/20"
        />
        
        <motion.div
          animate={{
            y: [0, 80, 0],
            rotate: [0, -180, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-[15%] w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full backdrop-blur-md shadow-2xl shadow-purple-500/20"
        />

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-[20%] w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-2 sm:border-4 border-pink-400/40 rotate-45 shadow-2xl shadow-pink-500/20"
        />

        <motion.div
          animate={{
            y: [0, -80, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-[25%] w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 bg-gradient-to-tr from-blue-400/25 to-transparent rounded-full backdrop-blur-md shadow-2xl shadow-blue-500/30"
        />

        {/* Nouveaux éléments fantastiques */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="hidden sm:block absolute top-1/2 left-[5%] w-48 h-48 lg:w-72 lg:h-72 border-2 border-cyan-400/30 rounded-full"
        />
        
        <motion.div
          animate={{
            rotate: -360,
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden md:block absolute bottom-10 right-[10%] w-40 h-40 lg:w-60 lg:h-60 bg-gradient-to-tl from-indigo-400/20 to-pink-400/20 rounded-2xl rotate-12 backdrop-blur-sm shadow-2xl shadow-indigo-500/20"
        />

        {/* Animated Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 === 0 ? 25 : -25), 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}

        {/* Glowing Orbs - AGRANDIS */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-500/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-purple-500/30 rounded-full blur-3xl"
        />

        {/* Orbes supplémentaires */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden sm:block absolute top-1/2 right-1/4 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-pink-500/20 rounded-full blur-3xl"
        />

        {/* Floating Lines/Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="10%" y1="20%"
            x2="90%" y2="80%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{
              x2: ["90%", "85%", "90%"],
              y2: ["80%", "75%", "80%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.line
            x1="80%" y1="10%"
            x2="20%" y2="90%"
            stroke="url(#gradient2)"
            strokeWidth="1"
            animate={{
              x1: ["80%", "75%", "80%"],
              y1: ["10%", "15%", "10%"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10 px-4"
      >
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 rounded-full text-blue-700 text-xs sm:text-sm font-medium border border-blue-300">
            👋 Bienvenue sur mon portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight"
        >
          Développeur
          <br />
          <span className="gradient-text">Fullstack</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
        >
          Passionné par la création d'expériences web modernes et performantes.
          Je transforme vos idées en applications élégantes et fonctionnelles.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <a
            href="#projects"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 text-center"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white/80 text-blue-600 rounded-lg text-sm sm:text-base font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 border border-blue-200 text-center"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-4 sm:gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            <Github className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
          >
            <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-blue-600 z-10"
      >
        <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8" />
      </motion.a>
    </section>
  )
}
