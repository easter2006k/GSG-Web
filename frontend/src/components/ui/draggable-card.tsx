import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DraggableCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCardContainer({ children, className }: DraggableCardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden select-none touch-none',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DraggableCardBody) {
          return React.cloneElement(child as React.ReactElement<any>, {
            containerRef,
          });
        }
        return child;
      })}
    </div>
  );
}

export interface DraggableCardBodyProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
}

export function DraggableCardBody({
  children,
  className,
  containerRef,
  onClick,
}: DraggableCardBodyProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(10);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      whileHover={{
        scale: 1.05,
        zIndex: 50,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        cursor: 'grab',
      }}
      whileTap={{
        scale: 0.98,
        cursor: 'grabbing',
        zIndex: 50,
      }}
      onDragStart={() => {
        setIsDragging(true);
        setZIndex(40);
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
      onClick={() => {
        if (!isDragging && onClick) {
          onClick();
        }
      }}
      style={{ zIndex }}
      className={cn(
        'cursor-grab active:cursor-grabbing rounded-3xl bg-white p-4 shadow-xl border border-slate-200 transition-shadow',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function DraggableCardDemo() {
  const items = [
    {
      title: "CHSS Rathinapuri",
      location: "Rathinapuri, Coimbatore",
      image: "/images/gallery/cards/chss-rathinapuri_photo.jpg",
      className: "absolute top-10 left-[15%] md:left-[20%] rotate-[-5deg]",
    },
    {
      title: "CBHSS RS Puram",
      location: "RS Puram, Coimbatore",
      image: "/images/gallery/cards/cbhss-rspuram_photo.jpg",
      className: "absolute top-40 left-[20%] md:left-[25%] rotate-[-7deg]",
    },
    {
      title: "GHSS Kalapatti",
      location: "Kalapatti, Coimbatore",
      image: "/images/gallery/cards/ghss-kalapatti_photo.jpg",
      className: "absolute top-5 left-[35%] md:left-[40%] rotate-[8deg]",
    },
    {
      title: "CGHSS Oppanakara St",
      location: "Oppanakara, Coimbatore",
      image: "/images/gallery/cards/cghss-oppanakara_photo.jpg",
      className: "absolute top-32 left-[50%] md:left-[55%] rotate-[10deg]",
    },
    {
      title: "GHSS Karamadai",
      location: "Karamadai, Coimbatore",
      image: "/images/gallery/cards/ghss-karamadai_photo.jpg",
      className: "absolute top-20 right-[25%] md:right-[35%] rotate-[2deg]",
    },
    {
      title: "GHSS Kuniyamuthur",
      location: "Kuniyamuthur, Coimbatore",
      image: "/images/gallery/cards/ghss-kuniyamuthur_photo.jpg",
      className: "absolute top-24 left-[40%] md:left-[45%] rotate-[-7deg]",
    },
    {
      title: "GHSS Mettupalayam",
      location: "Mettupalayam, Coimbatore",
      image: "/images/gallery/cards/ghss-mettupalayam_photo.jpg",
      className: "absolute top-8 left-[25%] md:left-[30%] rotate-[4deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-slate-950">
      <p className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-2xl font-black text-slate-800 md:text-4xl select-none pointer-events-none">
        Empowering 45,000+ Students Across Coimbatore
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-72 w-72 md:h-80 md:w-80 object-cover rounded-2xl"
          />
          <h3 className="mt-4 text-center text-xl md:text-2xl font-bold text-slate-900">
            {item.title}
          </h3>
          <p className="text-center text-xs font-semibold text-amber-600 mt-1">
            {item.location}
          </p>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
