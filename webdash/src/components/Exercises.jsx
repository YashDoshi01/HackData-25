import { CardStack } from "@/components/ui/card-stack";

const cardItems = [
  {
    id: 1,
    content: "Take a Break......Meditate",
  },
  {
    id: 2,
    content: "Deep breathing exercises",

  },
  {
    id: 3,
    content: "Drink Water.....Light stretching",
  },
];

export default function Exercises() {
  return (
    <div className="flex justify-center items-center h-screen">
      <CardStack items={cardItems} offset={15} scaleFactor={0.07} />
    </div>
  );
}
