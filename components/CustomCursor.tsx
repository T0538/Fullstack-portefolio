'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      )
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateCursor)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateCursor)
    }
  }, [])

  return (
    <>
      {/* Curseur principal - LÉGER */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.3,
        }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </motion.div>

      {/* Cercle externe léger */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.2,
        }}
      >
        <div className="w-8 h-8 border border-blue-400/40 rounded-full" />
      </motion.div>
    </>
  )
}
