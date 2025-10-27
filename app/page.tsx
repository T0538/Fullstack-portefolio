'use client'

import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import AdminShortcut from '@/components/AdminShortcut'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 cursor-none">
      <CustomCursor />
      <AdminShortcut />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
