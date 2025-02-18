export type Card = {
  id: string;
  name: string;
  image: string;
  power: number;
  cost: number;
  type: string;
  rarity?: string;
  attribute?: string;
  description?: string;
};

// Ajout des types pour le deck building
export type Deck = {
  id: string;
  name: string;
  cards: DeckCard[];
  leader?: Card;
};

export type DeckCard = {
  card: Card;
  quantity: number;
}; 