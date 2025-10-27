# 🚀 Guide de Déploiement sur Netlify

## 📋 Prérequis

1. Un compte GitHub (ou GitLab/Bitbucket)
2. Un compte Netlify (gratuit) : https://app.netlify.com/signup

## 🔧 Étapes de Déploiement

### 1. Préparer le Code

```bash
# Vérifier que tout fonctionne localement
npm run build
npm start
```

### 2. Push sur GitHub

```bash
# Initialiser Git (si pas encore fait)
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Prêt pour déploiement Netlify"


# Créer un repo sur GitHub puis:
git remote add origin https://github.com/T0538/Fullstack-portefolio.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Netlify

#### Option A : Via l'Interface Web (Recommandé)

1. Aller sur https://app.netlify.com
2. Cliquer sur **"Add new site"** → **"Import an existing project"**
3. Choisir **GitHub** et autoriser Netlify
4. Sélectionner votre repository **portfolio**
5. Configurer les paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
   - **Branch** : `main`
6. **Variables d'environnement** (section Environment) :
   ```
   ADMIN_PASSWORD=VotreMotDePasseSecurise
   ```
7. Cliquer sur **"Deploy site"**

#### Option B : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod
```

### 4. Configuration Post-Déploiement

#### A. Configurer le Domaine
1. Dans Netlify Dashboard → **Domain settings**
2. Choisir un sous-domaine gratuit : `votre-nom.netlify.app`
3. Ou connecter un domaine personnalisé

#### B. Variables d'Environnement
1. Aller dans **Site settings** → **Environment variables**
2. Ajouter :
   - `ADMIN_PASSWORD` : Votre mot de passe admin sécurisé

#### C. Activer les Fonctions (Important pour l'Admin)
Les API routes Next.js sont automatiquement déployées comme Netlify Functions.

### 5. Accéder à votre Site

```
🌐 Site public : https://votre-nom.netlify.app
🔐 Admin : https://votre-nom.netlify.app/admin (Ctrl+K)
```

## 🔄 Mises à Jour Automatiques

Chaque fois que vous push sur GitHub, Netlify redéploiera automatiquement !

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour du portfolio"
git push

# Netlify redéploie automatiquement ✨
```

## ⚙️ Fichiers Importants

- `netlify.toml` : Configuration Netlify
- `.env.example` : Exemple de variables d'environnement
- `package.json` : Dépendances et scripts

## 🐛 Dépannage

### Erreur de Build
```bash
# Vérifier localement
npm run build
```

### Problème avec les Images
Les images Unsplash fonctionnent automatiquement.
Pour vos images uploadées, elles sont dans `/public/projects/`

### Admin ne fonctionne pas
Vérifier que la variable `ADMIN_PASSWORD` est bien configurée dans Netlify.

## 📱 Fonctionnalités Disponibles

✅ Portfolio public
✅ Interface admin (Ctrl+K)
✅ Upload d'images
✅ Gestion des projets
✅ Curseur personnalisé
✅ Animations fluides
✅ Design responsive
✅ Contact form

## 🎉 C'est Prêt !

Votre portfolio est maintenant en ligne sur Netlify avec :
- ⚡ Performance optimale
- 🔒 HTTPS automatique
- 🌍 CDN global
- 🔄 Déploiement continu

---

**Besoin d'aide ?**
- Documentation Netlify : https://docs.netlify.com/
- Support Next.js : https://nextjs.org/docs
