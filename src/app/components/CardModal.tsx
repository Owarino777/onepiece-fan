import { useEffect, useRef } from "react";
import { Card as CardType } from "../../types";
import { ATTRIBUTE_COLORS } from '../../constants/colors';
import { ImageZoom } from './ImageZoom';
import { CardCarousel } from './CardCarousel';
import { CardStats } from './CardStats';

type CardModalProps = {
  card: CardType;
  isOpen: boolean;
  onClose: () => void;
  allCards: CardType[];
  onCardChange: (card: CardType) => void;
};

export const CardModal = ({ card, isOpen, onClose, allCards, onCardChange }: CardModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      initialFocusRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="card-modal-title"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
      >
        {/* Header */}
        <div className="bg-black text-white p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span>{card.id}</span>
              <span>|</span>
              <span>{card.type}</span>
            </div>
            <button 
              ref={initialFocusRef}
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <h2 id="card-modal-title" className="text-2xl font-bold mt-2">{card.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image avec gestion d'erreur et loading */}
          <ImageZoom src={card.image} alt={card.name} />

          {/* Détails */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                <div className="text-sm text-gray-600 dark:text-gray-400">Coût</div>
                <div className="text-2xl font-bold">{card.cost}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                <div className="text-sm text-gray-600 dark:text-gray-400">Puissance</div>
                <div className="text-2xl font-bold">{card.power}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Attribut:</span>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-colors
                  ${card.attribute ? ATTRIBUTE_COLORS[card.attribute as keyof typeof ATTRIBUTE_COLORS] : ''}`}>
                  {card.attribute}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Type:</span>
                <span>{card.type}</span>
              </div>
              {card.rarity && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Rareté:</span>
                  <span className={card.rarity === 'Super Rare' ? 'text-amber-500' : ''}>
                    {card.rarity}
                  </span>
                </div>
              )}

              {/* Effets */}
              {card.description && (
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Effet</h3>
                  <p className="text-gray-700 dark:text-gray-300">{card.description}</p>
                </div>
              )}

              {/* Extension */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Extension: ONE PIECE CARD THE BEST [PRB-01]
                </div>
              </div>

              {/* Bouton de partage */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: card.name,
                      text: `Découvrez la carte ${card.name} du One Piece Card Game!`,
                      url: window.location.href
                    });
                  }
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                aria-label="Partager la carte"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Partager
              </button>

              {/* Ajout des statistiques détaillées */}
              <CardStats card={card} allCards={allCards} />
            </div>
          </div>
        </div>

        {/* Ajouter le carrousel */}
        <CardCarousel 
          currentCard={card}
          cards={allCards}
          onCardClick={onCardChange}
        />
      </div>
    </div>
  );
}; 