'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Contact() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    setParticles(
      [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    )
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData)
    alert('Message envoyé ! Je vous répondrai bientôt.')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'yame.kevine@hotmail.com',
      link: 'mailto:yame.kevine@hotmail.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'Téléphone',
      value: '+225 0100553443',
      link: 'tel:+2250100553443',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Localisation',
      value: 'Abidjan, Côte d\'Ivoire',
      link: '#',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      {/* Design Moderne et Humain - Formes Géométriques */}
      <div className="absolute inset-0 opacity-10">
        {/* Lignes diagonales */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 origin-left"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45 origin-right"
        />
        
        {/* Carrés flottants */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-32 h-32 border-2 border-white/40"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-16 w-24 h-24 border-2 border-white/30"
        />
        
        {/* Points lumineux subtils */}
        {particles.slice(0, 6).map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-1 h-1 bg-white"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
        
        {/* Grille moderne */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

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
            💬
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discutons de votre <span className="text-blue-200">projet</span>
          </h2>
          <p className="text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Vous avez une idée brillante ? Un projet en tête ? Ou simplement envie d'échanger ?<br />
            Je serais ravi de discuter avec vous autour d'un café virtuel ☕
          </p>
        </motion.div>

        {/* Cartes de contact - Disposition horizontale moderne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl hover:bg-white transition-all duration-300 border border-white/30 shadow-xl hover:shadow-2xl group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg"
                >
                  {info.icon}
                </motion.div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{info.title}</p>
                  <p className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">{info.value}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Section avec design moderne */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Grande carte avec illustration */}
            <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl border-2 border-white/40 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  👋
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Travaillons ensemble</h3>
                  <p className="text-gray-600">Basé à Abidjan, Côte d'Ivoire</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Je suis passionné par la création d'expériences numériques exceptionnelles. 
                Que ce soit pour un nouveau projet, une collaboration ou simplement échanger des idées, 
                je suis toujours ouvert à de nouvelles opportunités !
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="text-sm text-gray-600 font-medium">Réponse rapide</p>
                  <p className="text-xs text-gray-500">24-48h</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <p className="text-3xl mb-2">🌍</p>
                  <p className="text-sm text-gray-600 font-medium">Disponible</p>
                  <p className="text-xs text-gray-500">Remote & Local</p>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl"
              >
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-blue-100 text-sm">Satisfaction client</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 p-6 rounded-2xl shadow-xl border-2 border-blue-200"
              >
                <p className="text-4xl font-bold text-gray-900 mb-2">24/7</p>
                <p className="text-gray-600 text-sm">Support disponible</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form - Plus large */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl border-2 border-white/40 shadow-2xl h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    📮
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Envoyez-moi un message
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Partagez-moi votre projet et faisons-le devenir réalité ensemble !
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-900 font-medium mb-2"
                    >
                      Votre nom ✏️
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:border-blue-300"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-900 font-medium mb-2"
                    >
                      Votre email 📧
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:border-blue-300"
                      placeholder="jean.dupont@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-900 font-medium mb-2"
                  >
                    Votre message 💭
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-5 py-4 bg-white border-2 border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none shadow-sm hover:border-blue-300"
                    placeholder="Bonjour ! J'aimerais discuter d'un projet avec vous..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/40 hover:shadow-2xl"
                >
                  <Send size={22} />
                  <span>Envoyer mon message</span>
                  <span className="text-xl">🚀</span>
                </motion.button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  En envoyant ce message, vous acceptez d'être contacté par email 📬
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 pt-10 border-t-2 border-white/20 text-center"
        >
          <p className="text-white/80 text-lg">
            © 2024 Portfolio. Développé avec ❤️ et Next.js
          </p>
          <p className="text-white/60 text-sm mt-2">
            Abidjan, Côte d'Ivoire 🇨🇮
          </p>
        </motion.div>
      </div>
    </section>
  )
}
