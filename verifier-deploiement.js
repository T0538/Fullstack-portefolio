#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification du projet pour déploiement Netlify...\n');

let errors = 0;
let warnings = 0;

// Vérifier les fichiers essentiels
const requiredFiles = [
  'package.json',
  'next.config.js',
  'netlify.toml',
  '.gitignore'
];

console.log('📁 Fichiers essentiels:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
    errors++;
  }
});

// Vérifier package.json
console.log('\n📦 Scripts package.json:');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (pkg.scripts && pkg.scripts.build) {
    console.log(`  ✅ Script "build": ${pkg.scripts.build}`);
  } else {
    console.log('  ❌ Script "build" manquant');
    errors++;
  }
  
  if (pkg.scripts && pkg.scripts.start) {
    console.log(`  ✅ Script "start": ${pkg.scripts.start}`);
  } else {
    console.log('  ⚠️  Script "start" manquant');
    warnings++;
  }
} catch (e) {
  console.log('  ❌ Erreur lecture package.json');
  errors++;
}

// Vérifier les dossiers
console.log('\n📂 Structure des dossiers:');
const requiredDirs = ['app', 'components', 'public'];
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ❌ ${dir}/ - MANQUANT`);
    errors++;
  }
});

// Vérifier .env.example
console.log('\n🔐 Variables d\'environnement:');
if (fs.existsSync('.env.example')) {
  console.log('  ✅ .env.example présent');
  console.log('  ℹ️  N\'oubliez pas de configurer les variables dans Netlify');
} else {
  console.log('  ⚠️  .env.example manquant');
  warnings++;
}

// Vérifier .gitignore
console.log('\n🚫 .gitignore:');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const important = ['.next', 'node_modules', '.env'];
  important.forEach(item => {
    if (gitignore.includes(item)) {
      console.log(`  ✅ ${item} ignoré`);
    } else {
      console.log(`  ⚠️  ${item} non ignoré`);
      warnings++;
    }
  });
} else {
  console.log('  ❌ .gitignore manquant');
  errors++;
}

// Résumé
console.log('\n' + '='.repeat(50));
console.log('📊 RÉSUMÉ:');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('✅ Tout est prêt pour le déploiement Netlify! 🚀');
  console.log('\n📝 Prochaines étapes:');
  console.log('  1. git add .');
  console.log('  2. git commit -m "Prêt pour déploiement"');
  console.log('  3. git push');
  console.log('  4. Connecter sur Netlify via GitHub');
  process.exit(0);
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} erreur(s) critique(s)`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} avertissement(s)`);
  }
  console.log('\n🔧 Corrigez les erreurs avant de déployer.');
  process.exit(1);
}
