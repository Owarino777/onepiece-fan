import { Card } from "../../types";

type StatisticsProps = {
  cards: Card[];
};

export const Statistics = ({ cards }: StatisticsProps) => {
  // Calcul de la moyenne de puissance par attribut
  const powerByAttribute = cards.reduce((acc, card) => {
    if (!card.attribute) return acc;
    if (!acc[card.attribute]) {
      acc[card.attribute] = { total: 0, count: 0 };
    }
    acc[card.attribute].total += card.power;
    acc[card.attribute].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  // Distribution des raretés
  const rarityDistribution = cards.reduce((acc, card) => {
    if (!card.rarity) return acc;
    acc[card.rarity] = (acc[card.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Répartition des coûts
  const costDistribution = cards.reduce((acc, card) => {
    acc[card.cost] = (acc[card.cost] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6 bg-white/90 dark:bg-gray-800 rounded-xl">
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Puissance moyenne par attribut</h3>
        <div className="space-y-2">
          {Object.entries(powerByAttribute).map(([attribute, { total, count }]) => (
            <div key={attribute} className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">{attribute}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.round(total / count)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Distribution des raretés</h3>
        <div className="space-y-2">
          {Object.entries(rarityDistribution).map(([rarity, count]) => (
            <div key={rarity} className="flex justify-between items-center">
              <span className={`${rarity === 'Super Rare' ? 'text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}>
                {rarity}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Répartition des coûts</h3>
        <div className="space-y-2">
          {Object.entries(costDistribution)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([cost, count]) => (
              <div key={cost} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Coût {cost}</span>
                <span className="font-medium text-gray-900 dark:text-white">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}; 