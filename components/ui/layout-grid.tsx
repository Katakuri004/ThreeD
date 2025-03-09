"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  gradient: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = React.useState<Card | null>(null);
  const [lastSelected, setLastSelected] = React.useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full p-4 grid grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-4">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "min-h-[100px]")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden rounded-xl cursor-pointer",
              selected?.id === card.id
                ? "absolute inset-0 h-96 w-full md:w-[500px] m-auto z-50 flex justify-center items-center flex-col"
                : lastSelected?.id === card.id
                ? "z-40 h-full w-full"
                : "h-full w-full"
            )}
            layoutId={`card-${card.id}`}
            style={{
              transformOrigin: "center",
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <GradientComponent card={card} />
          </motion.div>
        </div>
      ))}
      {selected && (
        <motion.div
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black cursor-pointer"
        />
      )}
    </div>
  );
};

const GradientComponent = ({ card }: { card: Card }) => {
  return (
    <motion.div
      layoutId={`gradient-${card.id}`}
      className="relative w-full h-full"
    >
      <div className={`aspect-[3/2] w-full bg-gradient-to-br ${card.gradient} transition-all duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100 rounded-xl`}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="text-white text-base font-medium leading-tight">
            {card.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10 rounded-xl"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 py-6 z-[70]"
      >
        <div className="text-white text-lg font-medium">
          {selected?.content}
        </div>
      </motion.div>
    </div>
  );
}; 