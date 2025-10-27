# 🚀 Portfolio Développeur Fullstack

Un portfolio moderne, élégant et professionnel construit avec les dernières technologies web.

## ✨ Caractéristiques

- **Design Moderne** : Interface élégante avec animations fluides
- **Responsive** : Parfaitement adapté à tous les appareils
- **Animations** : Effets visuels sophistiqués avec Framer Motion
- **Performance** : Optimisé pour des temps de chargement rapides
- **TypeScript** : Code type-safe et maintenable
- **Sections Complètes** :
  - Hero avec présentation accrocheuse
  - À propos avec mise en valeur des compétences
  - Compétences techniques avec barres de progression
  - Projets avec galerie interactive
  - Formulaire de contact fonctionnel

## 🛠️ Technologies Utilisées

- **Next.js 14** - Framework React pour la production
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides et modernes
- **Lucide React** - Icônes élégantes

## 📦 Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir dans le navigateur** :
Visitez [http://localhost:3000](http://localhost:3000)

## 🎨 Personnalisation

### Modifier les informations personnelles

1. **Hero Section** (`components/Hero.tsx`) :
   - Modifier le titre et la description
   - Mettre à jour les liens des réseaux sociaux

2. **À propos** (`components/About.tsx`) :
   - Personnaliser la description
   - Ajuster les caractéristiques mises en avant

3. **Compétences** (`components/Skills.tsx`) :
   - Ajouter/modifier vos technologies
   - Ajuster les niveaux de compétence (0-100)

4. **Projets** (`components/Projects.tsx`) :
   - Remplacer avec vos propres projets
   - Mettre à jour les images, descriptions et liens
   - Modifier les tags technologiques

5. **Contact** (`components/Contact.tsx`) :
   - Mettre à jour vos coordonnées
   - Configurer l'envoi du formulaire (actuellement en console.log)

### Couleurs et Thème

Les couleurs sont définies dans `tailwind.config.js`. Vous pouvez modifier :
- Les couleurs primaires
- Les animations
- Les effets de gradient

### Polices

La police est configurée dans `app/layout.tsx`. Vous pouvez la changer en important une autre police depuis `next/font/google`.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Pusher votre code sur GitHub
2. Connecter votre repository à [Vercel](https://vercel.com)
3. Déployer automatiquement

### Build de production

```bash
npm run build
npm start
```

## 📝 Structure du Projet

```
portolio/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── components/
│   ├── Navigation.tsx   # Barre de navigation
│   ├── Hero.tsx         # Section hero
│   ├── About.tsx        # Section à propos
│   ├── Skills.tsx       # Section compétences
│   ├── Projects.tsx     # Section projets
│   └── Contact.tsx      # Section contact
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 💡 Conseils

- Remplacez les images de projets par vos propres captures d'écran
- Configurez un service d'envoi d'emails pour le formulaire de contact (ex: EmailJS, SendGrid)
- Ajoutez votre propre favicon dans le dossier `app/`
- Personnalisez les méta-données SEO dans `app/layout.tsx`
- Ajoutez Google Analytics si nécessaire

## 🎯 Prochaines Étapes

1. Personnaliser tout le contenu avec vos informations
2. Ajouter vos vrais projets avec captures d'écran
3. Configurer le formulaire de contact avec un service d'envoi d'emails
4. Optimiser les images pour de meilleures performances
5. Ajouter un blog (optionnel)
6. Configurer le SEO et les méta-données
7. Déployer en production

## 📄 Licence

Ce projet est libre d'utilisation. N'hésitez pas à le personnaliser selon vos besoins !

---

Développé avec ❤️ et Next.js
