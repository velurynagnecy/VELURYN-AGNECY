import React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn's utility for class names

/**
 * @typedef CardItem
 * @property {string | number} id - Unique identifier for the card.
 * @property {string} title - The main title text of the card.
 * @property {string} subtitle - The subtitle or category text.
 * @property {string} imageUrl - The URL for the card's background image.
 */
export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

/**
 * @typedef HoverRevealCardsProps
 * @property {CardItem[]} items - An array of card item objects to display.
 * @property {string} [className] - Optional additional class names for the container.
 * @property {string} [cardClassName] - Optional additional class names for individual cards.
 */
export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
}

/**
 * A component that displays a grid of cards with a hover-reveal effect.
 * When a card is hovered or focused, it stands out while others are de-emphasized.
 */
const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
}) => {
  return (
    // The `group` class on the container enables styling children on parent hover.
    <div
      role="list"
      className={cn(
        'group grid w-full max-w-6xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0} // Makes the div focusable for keyboard navigation.
          className={cn(
            'relative h-80 cursor-pointer overflow-hidden rounded-xl border border-[#FFD504]/20 bg-gradient-to-br from-[#0a1e5e] via-[#071644] to-[#040d2b] shadow-lg transition-all duration-500 ease-in-out',
            // On desktop parent hover, apply these styles to all children.
            'md:group-hover:scale-[0.97] md:group-hover:opacity-60 md:group-hover:blur-[2px]',
            // On child hover/focus, override parent hover styles to highlight the current item.
            'md:hover:!scale-105 md:hover:!opacity-100 md:hover:!blur-none hover:border-[#FFD504]/60 focus-visible:!scale-105 focus-visible:!opacity-100 focus-visible:!blur-none',
            // Accessibility: Add focus ring using theme variables.
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            cardClassName
          )}
          style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(255, 213, 4, 0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(11, 95, 255, 0.25) 0%, transparent 50%)',
            }}
          />

          {/* Subtle Grid Accent */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Card Top Right: Pillar Index */}
          <div className="absolute top-5 right-5 z-10 text-[#FFD504] font-mono text-xs font-bold">
            {String(item.id).padStart(2, '0')}
          </div>

          {/* Center Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25 flex flex-col items-center">
            <span className="text-base text-[#FFD504]">✦</span>
            <span className="text-[9px] tracking-[0.25em] font-semibold uppercase text-white mt-0.5">VELURYN</span>
          </div>

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Card Content */}
          <div className="absolute bottom-0 left-0 p-6 z-10">
            <p className="text-sm font-light uppercase tracking-widest opacity-90 !text-[#D8E6FC]" style={{ color: '#D8E6FC' }}>
              {item.subtitle}
            </p>
            <h3 className="mt-1 text-2xl font-semibold !text-[#EBF3FF]" style={{ color: '#EBF3FF' }}>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverRevealCards;
