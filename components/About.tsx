'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Palette, Zap } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: <Code2 size={32} />,
      title: 'Code Propre',
      description: 'Développement avec les meilleures pratiques et architecture solide',
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description: 'Applications rapides et optimisées pour tous les appareils',
    },
    {
      icon: <Database size={32} />,
      title: 'Backend Robuste',
      description: 'APIs sécurisées et scalables avec gestion efficace des données',
    },
    {
      icon: <Palette size={32} />,
      title: 'Design Moderne',
      description: 'Interfaces élégantes avec une excellente expérience utilisateur',
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements - AGRANDIS */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-20 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-purple-400/10 rounded-full blur-3xl"
        />
        
        {/* Éléments fantastiques supplémentaires */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="hidden sm:block absolute top-1/2 left-1/2 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] border-2 border-cyan-300/20 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            À Propos de <span className="gradient-text">Moi</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Développeur fullstack passionné avec une expertise dans la création
            d'applications web modernes. Je combine créativité et compétences
            techniques pour donner vie à vos projets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.08,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-2xl border border-blue-100 group"
            >
              <motion.div 
                className="inline-block p-3 sm:p-4 bg-blue-500/20 rounded-lg mb-3 sm:mb-4 text-blue-600"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
