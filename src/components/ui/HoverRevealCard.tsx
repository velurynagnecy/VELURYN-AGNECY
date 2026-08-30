import React, { createContext, useContext, useState, forwardRef } from "react";
import "./HoverRevealCard.css";

interface CardHoverRevealContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardHoverRevealContext = createContext<CardHoverRevealContextValue>({} as CardHoverRevealContextValue);

export const useCardHoverRevealContext = () => {
  const context = useContext(CardHoverRevealContext);
  if (!context) {
    throw new Error("useCardHoverRevealContext must be used within a CardHoverRevealProvider");
  }
  return context;
};

export const CardHoverReveal = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
      <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered }}>
        <div
          ref={ref}
          className={`card-hover-reveal ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        />
      </CardHoverRevealContext.Provider>
    );
  }
);
CardHoverReveal.displayName = "CardHoverReveal";

interface CardHoverRevealMainProps {
  initialScale?: number;
  hoverScale?: number;
}
export const CardHoverRevealMain = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CardHoverRevealMainProps>(
  ({ className = "", initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext();
    return (
      <div
        ref={ref}
        className={`card-hover-reveal-main ${className}`}
        style={{
          transform: isHovered ? `scale(${hoverScale})` : `scale(${initialScale})`,
          ...props.style,
        }}
        {...props}
      />
    );
  }
);
CardHoverRevealMain.displayName = "CardHoverRevealMain";

export const CardHoverRevealContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext();
    return (
      <div
        ref={ref}
        className={`card-hover-reveal-content ${className}`}
        style={{
          transform: isHovered ? "translateY(0%)" : "translateY(110%)",
          opacity: isHovered ? 1 : 0,
          ...props.style,
        }}
        {...props}
      />
    );
  }
);
CardHoverRevealContent.displayName = "CardHoverRevealContent";

export const CardHoverRevealTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext();
    return (
      <div
        ref={ref}
        className={`card-hover-reveal-title ${className}`}
        style={{
          transform: isHovered ? "translateY(-10px)" : "translateY(0px)",
          ...props.style,
        }}
        {...props}
      />
    );
  }
);
CardHoverRevealTitle.displayName = "CardHoverRevealTitle";
