import { useState } from 'react';
import { Card, Deck, DeckCard } from '../../types';
import Image from 'next/image';

type DeckBuilderProps = {
  allCards: Card[];
  onSave: (deck: Deck) => void;
};

export const DeckBuilder = ({ allCards, onSave }: DeckBuilderProps) => {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [leader, setLeader] = useState<Card | null>(null);
  const [deckName, setDeckName] = useState('Nouveau Deck');

  const addCard = (card: Card) => {
    const existingCard = deck.find(dc => dc.card.id === card.id);
    if (existingCard) {
      if (existingCard.quantity < 4) { // Maximum 4 copies par carte
        setDeck(deck.map(dc => 
          dc.card.id === card.id 
            ? { ...dc, quantity: dc.quantity + 1 }
            : dc
        ));
      }
    } else {
      setDeck([...deck, { card, quantity: 1 }]);
    }
  };

  const removeCard = (cardId: string) => {
    setDeck(deck.map(dc => 
      dc.card.id === cardId 
        ? { ...dc, quantity: dc.quantity - 1 }
        : dc
    ).filter(dc => dc.quantity > 0));
  };

  const totalCards = deck.reduce((sum, dc) => sum + dc.quantity, 0);
  const isValid = leader && totalCards >= 50 && totalCards <= 60;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Liste des cartes disponibles */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold">Cartes disponibles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allCards.map(card => (
            <div 
              key={card.id}
              onClick={() => card.type === 'LEADER' ? setLeader(card) : addCard(card)}
              className="cursor-pointer transform hover:scale-105 transition-transform"
            >
              <Image 
                src={card.image} 
                alt={card.name}
                width={200}
                height={280}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-2 text-center text-sm">
                {deck.find(dc => dc.card.id === card.id)?.quantity || 0}/4
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deck en construction */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border bg-transparent"
        />

        {/* Leader */}
        <div>
          <h3 className="font-bold mb-2">Leader</h3>
          {leader ? (
            <div className="relative">
              <Image 
                src={leader.image} 
                alt={leader.name}
                width={200}
                height={280}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setLeader(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-4 text-center text-gray-500">
              Sélectionnez un leader
            </div>
          )}
        </div>

        {/* Liste des cartes */}
        <div>
          <h3 className="font-bold mb-2">Cartes ({totalCards}/50-60)</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {deck.map(({ card, quantity }) => (
              <div 
                key={card.id}
                className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Image 
                    src={card.image} 
                    alt={card.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{card.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{quantity}</span>
                  <button
                    onClick={() => removeCard(card.id)}
                    className="text-red-500"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (isValid && leader) {
              onSave({
                id: Date.now().toString(),
                name: deckName,
                cards: deck,
                leader
              });
            }
          }}
          disabled={!isValid}
          className={`w-full py-2 rounded-lg ${
            isValid 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Sauvegarder le deck
        </button>
      </div>
    </div>
  );
}; 