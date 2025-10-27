'use client'

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Développeur Full-Stack",
    "jobTitle": "Développeur Web Full-Stack",
    "url": "https://votre-site.netlify.app",
    "email": "yame.kevine@hotmail.com",
    "telephone": "+2250100553443",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abidjan",
      "addressCountry": "CI"
    },
    "sameAs": [
      "https://github.com/T0538"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "TailwindCSS",
      "Développement Web",
      "Full-Stack Development"
    ],
    "description": "Développeur web full-stack passionné basé à Abidjan, spécialisé en React, Next.js et applications web modernes"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
