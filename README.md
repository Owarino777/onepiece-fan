# One Piece Card Game Collection 🏴‍☠️

Une application web moderne pour explorer et gérer votre collection de cartes One Piece, construire des decks et analyser des statistiques.

![One Piece Card Game](public/preview.png)

## ✨ Fonctionnalités

### 🎴 Collection de Cartes
- Plus de 70 cartes uniques de l'univers One Piece
- Personnages légendaires incluant les Empereurs, Amiraux et Supernovas
- Visualisation détaillée des cartes avec zoom
- Filtrage par rareté, attribut et recherche par nom

### 🎲 Deck Builder
- Création de decks personnalisés
- Système de Leader
- Limite de 4 copies par carte
- Validation des règles (50-60 cartes)
- Statistiques de deck en temps réel

### 📊 Statistiques
- Analyse détaillée des cartes
- Distribution par attribut et rareté
- Comparaison de puissance
- Classement des cartes

### 🎨 Interface
- Design responsive
- Mode sombre/clair
- Animations fluides
- Interface intuitive et accessible

## 🛠 Technologies

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Animations**: CSS Transitions
- **Images**: Next.js Image Optimization
- **Accessibilité**: ARIA labels, navigation au clavier

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/one-piece-card-game.git
cd one-piece-card-game
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer en développement

```bash
npm run dev
```

### 4. Build pour la production

```bash
npm run build
```

## 📁 Structure du Projet
```
one-piece-card-game/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Card.tsx
│   │   │   ├── CardModal.tsx
│   │   │   ├── DeckBuilder.tsx
│   │   │   ├── Statistics.tsx
│   │   │   └── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── data/
│   │   └── sample-cards.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── colors.ts
└── public/
    └── cards/
```

## 🎮 Utilisation

1. **Exploration des Cartes**
   - Parcourez la collection complète
   - Utilisez les filtres pour affiner votre recherche
   - Cliquez sur une carte pour voir les détails

2. **Construction de Deck**
   - Cliquez sur "Créer un deck"
   - Sélectionnez un Leader
   - Ajoutez des cartes (max 4 copies)
   - Respectez la limite de 50-60 cartes

3. **Analyse des Statistiques**
   - Consultez les statistiques globales
   - Analysez la distribution des cartes
   - Comparez les puissances

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Todo

- [ ] Ajout de plus de cartes
- [ ] Système de sauvegarde des decks
- [ ] Export/Import de decks
- [ ] Mode simulation de combat
- [ ] Statistiques avancées de deck

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Crédits

- Images des cartes : One Piece Card Game
- Données des personnages : One Piece Wiki
- Design inspiré du TCG officiel

---

Développé avec ❤️ par Owarino