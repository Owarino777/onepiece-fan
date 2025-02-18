import { Card as CardType } from "../../types";
import { ATTRIBUTE_COLORS } from '../../constants/colors';

type CardStatsProps = {
  card: CardType;
  allCards: CardType[];
};

export const CardStats = ({ card, allCards }: CardStatsProps) => {
  // Calculs statistiques améliorés
  const stats = {
    powerRank: allCards.filter(c => c.power > card.power).length + 1,
    totalCards: allCards.length,
    powerPercentile: Math.round((1 - (allCards.filter(c => c.power > card.power).length / allCards.length)) * 100),
    avgPower: Math.round(allCards.reduce((acc, c) => acc + c.power, 0) / allCards.length),
    avgCost: Math.round(allCards.reduce((acc, c) => acc + c.cost, 0) / allCards.length * 10) / 10,
    sameAttribute: allCards.filter(c => c.attribute === card.attribute).length,
    sameRarity: allCards.filter(c => c.rarity === card.rarity).length,
    efficiency: Math.round((card.power / card.cost) * 100) / 100,
    avgEfficiency: Math.round(allCards.reduce((acc, c) => acc + (c.power / c.cost), 0) / allCards.length * 100) / 100
  };

  // Fonction pour afficher les différences avec la moyenne
  const getDifferenceLabel = (value: number, avg: number) => {
    const diff = value - avg;
    const sign = diff > 0 ? '+' : '';
    const className = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';
    return <span className={`text-sm ${className}`}>({sign}{diff.toFixed(1)})</span>;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Statistiques</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Rang</span>
          <span className="font-bold text-xl">{stats.powerRank}</span>
          <span className="text-sm text-gray-500">/ {stats.totalCards}</span>
        </div>
      </div>

      {/* Indicateur de percentile */}
      <div className="relative pt-2">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Plus fort que {stats.powerPercentile}% des cartes
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500"
            style={{ width: `${stats.powerPercentile}%` }}
          />
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Force</div>
          <div className="font-medium flex items-center gap-2">
            {card.power}
            {getDifferenceLabel(card.power, stats.avgPower)}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(card.power / 10000) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficacité (Force/Coût)</div>
          <div className="font-medium flex items-center gap-2">
            {stats.efficiency}
            {getDifferenceLabel(stats.efficiency, stats.avgEfficiency)}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(stats.efficiency / 2000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Distribution par attribut et rareté */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Distribution par attribut</div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-md text-white text-sm ${
              card.attribute ? ATTRIBUTE_COLORS[card.attribute as keyof typeof ATTRIBUTE_COLORS] : ''
            }`}>
              {card.attribute}
            </span>
            <span className="text-sm">
              ({stats.sameAttribute} cartes - {Math.round((stats.sameAttribute / stats.totalCards) * 100)}%)
            </span>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Distribution par rareté</div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${card.rarity === 'Super Rare' ? 'text-amber-500 font-bold' : ''}`}>
              {card.rarity}
            </span>
            <span className="text-sm">
              ({stats.sameRarity} cartes - {Math.round((stats.sameRarity / stats.totalCards) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 