"use client";

import { useEffect, useState, useMemo } from "react";
import {
  PolarGrid,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RadicalChart({ data = [] }) {
  const [chartData, setChartData] = useState([]);

  // Compute the latest stress level once
  const latestStressLevel = useMemo(() => data[0]?.value || 0, [data]);

  // Dynamically calculate angles for the arc
  const endAngle = useMemo(() => 90 - (latestStressLevel / 100) * 180, [latestStressLevel]);

  

  // Dynamically adjust radius based on stress level
  const { innerRadius, outerRadius } = useMemo(() => {
    if (latestStressLevel <= 25) return { innerRadius: 80, outerRadius: 90 };
    if (latestStressLevel <= 50) return { innerRadius: 70, outerRadius: 100 };
    if (latestStressLevel <= 75) return { innerRadius: 60, outerRadius: 110 };
    return { innerRadius: 50, outerRadius: 120 };
  }, [latestStressLevel]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => {
        let color = "#ef4444"; // Default: Red (High Stress)

        if (item.value <= 25) color = "#22c55e"; // Green (Low Stress)
        else if (item.value <= 50) color = "#f59e0b"; // Orange (Medium Stress)
        else if (item.value <= 75) color = "#d97706"; // Dark Orange
        else color = "#b91c1c"; // Dark Red

        return {
          name: item.label,
          value: Math.min(100, Math.max(0, item.value)), // Keep value in 0-100 range
          fill: color,
        };
      });

      setChartData(formattedData);
    }
  }, [data]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stress Level</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
        <RadialBarChart
  width={300}
  height={300}
  innerRadius={110}
  outerRadius={80}
  data={chartData}
  startAngle={240}  // Keep start angle fixed
  endAngle={endAngle}  // Use the corrected calculation
>

            <PolarGrid radialLines={false} />
            <RadialBar
              background={{ fill: "#e5e7eb" }}
              dataKey="value"
              cornerRadius={8}
              animationBegin={200}
            />
            {/* Center Text for Stress Level */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold"
            >
              {latestStressLevel}%
            </text>
          </RadialBarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Latest Stress Level
        </div>
      </CardFooter>
    </Card>
  );
}
