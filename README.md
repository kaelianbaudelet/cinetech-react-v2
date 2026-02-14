# CinéTech React

**Projet de cours : Atelier Découverte React JS - EPSI Arras**

## Présentation du Projet

CinéTech est une application de consultation de films et séries utilisant l'API **TMDb**. Ce projet a pour objectif de démontrer la maîtrise des concepts fondamentaux de **React JS** à travers l'implémentation de fonctionnalités.

---

## Fonctionnalités avancées implémentées

Conformément au cahier des charges, trois lots de fonctionnalités ont été sélectionnés et intégrés :

### 1. Lot n°1 : Recherche & Tri
- **Recherche dynamique** : Filtrage en temps réel des films par titre via une barre de recherche.
- **Filtres par Genre** : Utilisation des catégories officielles de TMDb pour cibler les recherches (Action, Animation, etc.).
- **Tri Avancé** : Possibilité de trier les résultats par popularité, note utilisateur ou date de sortie (ascendant/descendant).

### 2. Lot n°2 : Actions & Gestion
- **Bandes-annonces** : Intégration d'un bouton de lecture ouvrant une fenêtre modale YouTube pour chaque film.
- **Gestion du statut** : Système permettant de marquer un film comme "Vu" ou "À regarder plus tard".
- **Filtres de statut** : Section dédiée pour visualiser uniquement ses favoris, ses films vus ou sa liste d'attente.

### 3. Lot n°3 : Expérience Utilisateur (UX)
- **Pagination** : Affichage optimisé de 10 films par page avec contrôles de navigation (Précédent / Suivant).
- **Mode Sombre** : Interface adaptative (Dark/Light mode) pour un confort de lecture optimal.
- **Persistance** : Sauvegarde automatique du thème et des listes de films dans le `localStorage` pour conserver les données après rafraîchissement.

---

## Architecture Technique

### Technologies
- **React 19** : Hooks (`useState`, `useEffect`, `useMemo`) pour la réactivité.
- **Vite** : Outil de build rapide.
- **Tailwind CSS** : Design system utilitaire pour une interface moderne et responsive.
- **TMDb API** : Source de données externe.

### Organisation des Fichiers

```text
cinetech-react/
├── public/
│   └── images/          # Assets statiques (logos, etc.)
├── src/
│   ├── components/      # Composants React modulaires
│   │   ├── featuredMovie.jsx
│   │   ├── MovieCard.jsx
│   │   ├── moviesList.jsx
│   │   ├── section.jsx
│   │   ├── counter.jsx
│   │   └── testEffect.jsx
│   ├── data/            # Données locales et fallback
│   │   └── moviesList.js
│   ├── App.jsx          # Gestionnaire d'état et point d'entrée logique
│   ├── index.css        # Styles globaux et Tailwind
│   └── main.jsx         # Montage de l'application React
├── index.html           # Template HTML racine
├── tailwind.config.js   # Configuration du design system
├── vite.config.js       # Configuration de l'outil de build
├── postcss.config.js    # Plugins CSS (Autoprefixer)
├── eslint.config.js     # Règles de qualité de code
└── package.json         # Dépendances et scripts
```

---

## Installation et Utilisation

1. **Installation** :
   ```bash
   pnpm install
   ```
2. **Configuration** :
   Créez un fichier `.env` à la racine du projet et ajoutez votre clef API TMDb :
   ```env
   VITE_TMDB_API_KEY=votre_clef_api_ici
   ```
   *(Vous pouvez vous référer au fichier `.env.example`)*

3. **Lancement** :
   ```bash
   pnpm run dev
   ```
4. **Accès** : L'application est disponible par défaut sur `http://localhost:3000`.

---

© 2026 CinéTech React - Projet EPSI Arras
