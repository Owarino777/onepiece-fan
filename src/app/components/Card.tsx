import Image from "next/image";
import { Card as CardType } from "../../types";
import { ATTRIBUTE_COLORS, RARITY_STYLES } from '../../constants/colors';

type CardProps = CardType & {
  isPriority?: boolean;
};

export const Card = ({ id, name, image, power, cost, type, rarity, attribute, isPriority, onClick }: CardProps & { onClick?: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className={`group bg-background/80 backdrop-blur-sm border-2 rounded-xl shadow-lg overflow-hidden 
        hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer
        ${rarity ? RARITY_STYLES[rarity as keyof typeof RARITY_STYLES] : ''}`}
    >
      <div className="relative aspect-[3/4]">
        <Image 
          src={image} 
          alt={`Illustration de ${name}`} 
          fill
          priority={isPriority}
          className="object-cover transform transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 640px, 
                 (max-width: 768px) 384px, 
                 (max-width: 1024px) 341px, 
                 282px"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
          {id}
        </div>
        {attribute && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-medium ${ATTRIBUTE_COLORS[attribute as keyof typeof ATTRIBUTE_COLORS]}`}>
            {attribute}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1" tabIndex={0}>{name}</h3>
        <dl className="grid grid-cols-2 gap-y-2 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <dt className="font-medium">Coût:</dt>
            <dd>{cost}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-medium">Force:</dt>
            <dd>{power}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium">Type:</dt>
            <dd>{type}</dd>
          </div>
          {rarity && (
            <div className="col-span-2 flex items-center gap-2">
              <dt className="font-medium">Rareté:</dt>
              <dd className={`${rarity === 'Super Rare' ? 'text-amber-500' : ''}`}>{rarity}</dd>
            </div>
          )}
          {attribute && (
            <div className="col-span-2 flex items-center gap-2">
              <dt className="font-medium">Attribut:</dt>
              <dd>{attribute}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}; 