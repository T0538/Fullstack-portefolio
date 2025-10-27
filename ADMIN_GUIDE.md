# 🔐 Guide d'Administration du Portfolio

## Accès à l'Interface Admin

### URL d'accès
```
http://localhost:3001/admin
```
(En production : `https://votre-domaine.com/admin`)

### Connexion
- **Mot de passe par défaut** : `admin123`
- **⚠️ IMPORTANT** : Changez ce mot de passe avant de déployer en production !

## 📝 Comment Changer le Mot de Passe

Éditez le fichier : `app/api/admin/login/route.ts`

```typescript
// Ligne 5 - Changez cette valeur
const ADMIN_PASSWORD = 'votre-nouveau-mot-de-passe-securise'
```

## 🎯 Fonctionnalités

### 1. Ajouter un Projet

1. Cliquez sur **"Ajouter un projet"**
2. Remplissez les informations :
   - **Titre** : Nom du projet
   - **Description** : Description complète
   - **Image** : Uploadez une capture d'écran (formats acceptés : JPG, PNG, WebP)
   - **Technologies** : Listez les technologies séparées par des virgules
   - **Lien GitHub** : URL du repository (ou # si privé)
   - **Lien Demo** : URL du site en ligne
3. Cliquez sur **"Créer"**

### 2. Modifier un Projet

1. Cliquez sur **"Modifier"** sur le projet concerné
2. Modifiez les informations
3. Cliquez sur **"Mettre à jour"**

### 3. Supprimer un Projet

1. Cliquez sur **"Supprimer"** sur le projet concerné
2. Confirmez la suppression

### 4. Upload d'Images

- Les images sont uploadées dans `/public/projects/`
- Formats recommandés : PNG, JPG, WebP
- Taille recommandée : 800x400px minimum
- Poids max recommandé : 2 MB

## 🔒 Sécurité

### Session Admin
- La session dure **7 jours**
- Pour se déconnecter : cliquez sur **"Déconnexion"**
- La session utilise des cookies sécurisés

### Recommandations
1. ✅ Changez le mot de passe par défaut
2. ✅ Utilisez HTTPS en production
3. ✅ Ne partagez jamais votre mot de passe
4. ✅ Déconnectez-vous après utilisation

## 📂 Structure des Données

Les projets sont stockés dans : `data/projects.json`

Format d'un projet :
```json
{
  "id": "1234567890",
  "title": "Nom du Projet",
  "description": "Description complète",
  "image": "/projects/image.png",
  "tags": ["React", "Next.js"],
  "github": "https://github.com/...",
  "demo": "https://..."
}
```

## 🚀 API Endpoints

### Public
- `GET /api/projects` - Liste tous les projets

### Admin (authentifié)
- `POST /api/admin/login` - Connexion
- `GET /api/admin/check` - Vérifier la session
- `POST /api/admin/logout` - Déconnexion
- `POST /api/projects` - Créer un projet
- `PUT /api/projects/[id]` - Modifier un projet
- `DELETE /api/projects/[id]` - Supprimer un projet
- `POST /api/upload` - Upload une image

## 🐛 Dépannage

### Problème : "Unauthorized" lors de l'ajout d'un projet
**Solution** : Reconnectez-vous à l'interface admin

### Problème : L'image ne s'affiche pas
**Solution** : Vérifiez que l'image est bien dans `/public/projects/`

### Problème : Session expirée
**Solution** : Reconnectez-vous (durée de session : 7 jours)

## 📱 Utilisation Mobile

L'interface admin est responsive et peut être utilisée sur mobile/tablette.

---

**Créé pour la gestion du portfolio développeur fullstack**
