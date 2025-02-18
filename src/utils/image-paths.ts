export const getCardImagePath = (cardId: string, name: string, type: string) => {
  const subfolder = type === 'LEADER' ? 'leaders' : 'characters';
  return `/cards/${subfolder}/${name.replace(/ /g, '-')}.webp`;
};

export const CARD_PLACEHOLDERS = {
  back: '/cards/placeholders/card-back.webp',
  default: '/cards/placeholders/card-placeholder.webp',
}; 