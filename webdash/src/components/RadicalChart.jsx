"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function RadicalChart({ data }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item) => {
        let color = "red"; // Default: Green

        if (item.value <= 40) color = "green"; // Red
        else if (item.value > 40 && item.value <= 60)
          color = "orange"; // Orange-Yellow

        return {
          label: item.label || "Unknown",
          value: item.value || 0,
          fill: color,
        };
      });

      setChartData(formattedData);

      // Update chartConfig dynamically
      const newConfig = {
        stressLevel: {
          label: "Stress Level",
        },
        percentage: {
          label: "Percentage",
          color: formattedData.length > 0 ? formattedData[0].fill : "hsl(var(--chart-2))",
        },
      };

      setChartConfig(newConfig);
    }
  }, [data]); // Update whenever `data` changes

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stress Levels</CardTitle>
        <CardDescription>Dynamic Data Visualization</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData.length > 0
                            ? `${chartData[0].value}%`
                            : "0%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Stress Level
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing stress level percentage for today
        </div>
      </CardFooter>
    </Card>
  );
}
