"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 12;
  const SCALE_FACTOR = scaleFactor || 0.07;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // Create a copy of the array
        newArray.unshift(newArray.pop()); // Move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-64 w-72 md:h-72 md:w-[400px]">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute h-64 w-72 md:h-72 md:w-[400px] rounded-xl p-6 shadow-lg border border-white/10 backdrop-blur-lg bg-gradient-to-r from-[#6a11cb] to-[#2575fc] dark:from-[#2a0845] dark:to-[#6441a5] text-white transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center text-center"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="font-medium text-lg">{card.content}</div>
          <div className="mt-4">
            <p className="font-semibold text-white">{card.name}</p>
            <p className="text-white/80">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
