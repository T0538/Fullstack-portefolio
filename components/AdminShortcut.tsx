'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function AdminShortcut() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Raccourci: Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault()
        setShowNotification(true)
        // Redirection immédiate
        router.push('/admin')
        // Cacher la notification après
        setTimeout(() => setShowNotification(false), 300)
      }

      // Alternative: Ctrl + K (style moderne)
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        setShowNotification(true)
        // Redirection immédiate
        router.push('/admin')
        // Cacher la notification après
        setTimeout(() => setShowNotification(false), 300)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [router])

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-blue-600 text-white px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
        >
          <Shield size={18} />
          <span className="font-semibold text-sm">Admin</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
