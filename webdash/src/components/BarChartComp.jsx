"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const rawData = [
  { Day: "Sun", stress: 80 },
  { Day: "Mon", stress: 140 },
  { Day: "Tue", stress: 120 },
  { Day: "Wed", stress: 105 },
  { Day: "Thu", stress: 130 },
  { Day: "Fri", stress: 40 },
  { Day: "Sat", stress: 80 },
];

// Find max stress value
const maxStressValue = Math.max(...rawData.map((d) => d.stress));

// Normalize stress values to 0-100 range
const chartData = rawData.map((d) => ({
  Day: d.Day,
  stress: Math.round((d.stress / maxStressValue) * 100),
}));

export function BarChartComp() {
  // Find the max stress day
  const maxStressData = useMemo(() => {
    return chartData.reduce((max, item) => (item.stress > max.stress ? item : max), chartData[0]);
  }, []);

  return (
    <Card className="w-full max-w-[450px]"> {/* Adjust width */}
      <CardHeader>
        <CardTitle>Weekly Stress Levels (0-100)</CardTitle>
      </CardHeader>
      <CardContent className="p-4"> {/* Reduce padding */}
        <BarChart width={400} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" tickLine={false} tickMargin={10} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="stress"
            fill={(entry) => (entry.Day === maxStressData.Day ? "#DC2626" : "#15803D")} // Dark red for max, green for others
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </CardContent>
      <CardFooter className="text-sm pb-4"> {/* Removed extra padding */}
  <div className="leading-none text-muted-foreground">
    <strong>Max Stress Day:</strong> {maxStressData.Day} ({maxStressData.stress})
  </div>
</CardFooter>

    </Card>
  );
}
