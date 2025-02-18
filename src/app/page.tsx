"use client";

import { useState } from "react";
import { Card } from "./components/Card";
import { SAMPLE_CARDS } from "../data/sample-cards";
import { Statistics } from "./components/Statistics";
import { useWindowSize } from '../hooks/useWindowSize';
import { CardModal } from "./components/CardModal";
import { Card as CardType } from "../types";
import { DeckBuilder } from "./components/DeckBuilder";
import { Deck } from "../types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);
  const { width } = useWindowSize();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [showDeckBuilder, setShowDeckBuilder] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);

  const filteredCards = SAMPLE_CARDS.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = !selectedRarity || card.rarity === selectedRarity;
    const matchesAttribute = !selectedAttribute || card.attribute === selectedAttribute;
    
    return matchesSearch && matchesRarity && matchesAttribute;
  });

  const rarities = Array.from(new Set(SAMPLE_CARDS.map(card => card.rarity)));
  const attributes = Array.from(new Set(SAMPLE_CARDS.map(card => card.attribute)));

  // Fonction pour déterminer si une carte est visible initialement
  const isInitiallyVisible = (index: number) => {
    if (width < 640) {
      return index < 2;
    }
    if (width < 1024) {
      return index < 4;
    }
    return index < 6;
  };

  const handleSaveDeck = (deck: Deck) => {
    setDecks([...decks, deck]);
    setShowDeckBuilder(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
      <main className="max-w-7xl mx-auto p-6 space-y-8" role="main">
        <header className="text-center mb-12" role="banner">
          <h1 className="text-4xl font-bold mb-4" tabIndex={0}>One Piece Card Game</h1>
          <p className="text-foreground/60" tabIndex={0}>Explorez la collection de cartes</p>
        </header>

        <div className="max-w-md mx-auto px-4">
          <label htmlFor="search-cards" className="sr-only">Rechercher une carte</label>
          <input
            id="search-cards"
            type="search"
            placeholder="Rechercher une carte..."
            className="w-full px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Rechercher une carte"
          />
        </div>

        <div className="flex items-center justify-end mb-8 px-4">
          <span className="text-foreground/60 font-medium" role="status" aria-live="polite">
            {filteredCards.length} résultats trouvés
          </span>
        </div>

        <div className="flex flex-wrap gap-4 px-4" role="group" aria-label="Filtres de cartes">
          <div className="filter-group">
            <label htmlFor="rarity-filter" className="sr-only">Filtrer par rareté</label>
            <select 
              id="rarity-filter"
              className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              onChange={(e) => setSelectedRarity(e.target.value || null)}
              aria-label="Filtrer par rareté"
            >
              <option value="">Toutes les raretés</option>
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="attribute-filter" className="sr-only">Filtrer par attribut</label>
            <select 
              id="attribute-filter"
              className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              onChange={(e) => setSelectedAttribute(e.target.value || null)}
              aria-label="Filtrer par attribut"
            >
              <option value="">Tous les attributs</option>
              {attributes.map(attribute => (
                <option key={attribute} value={attribute}>{attribute}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end px-4">
          <button
            onClick={() => setShowDeckBuilder(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Créer un deck
          </button>
        </div>

        {showDeckBuilder ? (
          <DeckBuilder 
            allCards={SAMPLE_CARDS}
            onSave={handleSaveDeck}
          />
        ) : (
          <>
            {decks.length > 0 && (
              <div className="px-4">
                <h2 className="text-2xl font-bold mb-4">Mes Decks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {decks.map(deck => (
                    <div key={deck.id} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                      <h3 className="font-bold text-xl mb-2">{deck.name}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {deck.cards.reduce((sum, dc) => sum + dc.quantity, 0)} cartes
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
              role="list"
              aria-label="Liste des cartes"
            >
              {filteredCards.map((card, index) => (
                <article 
                  key={card.id} 
                  role="listitem"
                  aria-label={`Carte ${card.name}`}
                >
                  <Card 
                    {...card} 
                    isPriority={isInitiallyVisible(index)}
                    onClick={() => setSelectedCard(card)}
                  />
                </article>
              ))}
            </div>
          </>
        )}

        <CardModal
          card={selectedCard!}
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          allCards={SAMPLE_CARDS}
          onCardChange={setSelectedCard}
        />

        {/* Statistiques */}
        <Statistics cards={SAMPLE_CARDS} />
      </main>
    </div>
  );
}
