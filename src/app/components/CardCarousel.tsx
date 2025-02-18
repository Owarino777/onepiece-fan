import { useRef } from 'react';
import { Card as CardType } from '../../types';
import { Card } from './Card';

type CardCarouselProps = {
  currentCard: CardType;
  cards: CardType[];
  onCardClick: (card: CardType) => void;
};

export const CardCarousel = ({ currentCard, cards, onCardClick }: CardCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const similarCards = cards.filter(card => 
    card.id !== currentCard.id && 
    (card.attribute === currentCard.attribute || 
     card.type === currentCard.type ||
     card.rarity === currentCard.rarity)
  ).slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (similarCards.length === 0) return null;

  return (
    <div className="relative mt-8 px-4">
      <h3 className="text-xl font-bold mb-4">Cartes similaires</h3>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          disabled={scrollRef.current?.scrollLeft === 0}
          aria-label="Précédent"
        >
          ←
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {similarCards.map(card => (
            <div 
              key={card.id}
              className="flex-none w-[250px] snap-start"
            >
              <Card {...card} onClick={() => onCardClick(card)} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Suivant"
        >
          →
        </button>
      </div>
    </div>
  );
}; 