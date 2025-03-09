"use client";

import { useEffect, useState } from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export function SleepChart({ data = [], minValue = 4, maxValue = 12 }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => {
        let color = "red";
        if (item.value >= 8) color = "green"; // Healthy sleep
        else if (item.value >= 5) color = "orange"; // Moderate sleep

        return {
          label: item.label || "Unknown",
          value: item.value || 0,
          fill: color,
        };
      });

      setChartData(formattedData);
      setChartConfig({
        sleepLevel: { label: "Sleep Duration" },
        percentage: { label: "Hours", color: formattedData[0].fill || "red" },
      });
    }
  }, [data]);

  // Ensure safe access
  const sleepHours = chartData.length > 0 ? chartData[0].value : 4;

  // Convert sleep hours to percentage (4 = 0%, 12 = 100%)
  const sleepPercentage = ((sleepHours - minValue) / (maxValue - minValue)) * 100;

  // Calculate end angle for radial chart
  const endAngle = 90 - (sleepPercentage / 100) * 360;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sleep Hours</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          {chartData.length > 0 && (
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={endAngle}
              innerRadius={80}
              outerRadius={110}
              barSize={15}
            >
              <PolarGrid gridType="circle" radialLines={false} stroke="none" />
              <RadialBar dataKey="value" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox?.cx && viewBox?.cy) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                            {`${sleepHours} hrs`}
                          </tspan>
                          <tspan x={viewBox.cx} y={viewBox.cy + 24} className="fill-muted-foreground">
                            Sleep Duration
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
           Least amount of sleep needed
        </div>
      </CardFooter>
    </Card>
  );
}
