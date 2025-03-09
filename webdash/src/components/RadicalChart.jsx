"use client";
import { Label } from "recharts";
import { useEffect, useState } from "react";
import {
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

export function RadicalChart({ data = [] }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedData = data.map((item) => {
        let color = "red";
        if (item.value <= 40) color = "green"; // Low stress
        else if (item.value > 40 && item.value <= 65) color = "orange"; // Moderate stress

        return {
          label: item.label || "Stress Level",
          value: Math.min(100, Math.max(0, item.value)), // Ensure value is between 0-100
          fill: color,
        };
      });

      setChartData(formattedData);
      setChartConfig({
        stressLevel: { label: "Stress Level" },
        percentage: { label: "%", color: formattedData[0].fill || "red" },
      });
    }
  }, [data]);

  // Get latest stress level
  const latestStressLevel = chartData.length > 0 ? chartData[0].value : 0;
  const endAngle = 90 - (latestStressLevel / 100) * 360; // Dynamically calculate end angle


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stress Level</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          {chartData.length > 0 && (
            <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle} // Dynamically update end angle
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
                                            {`${latestStressLevel} hrs`}
                                          </tspan>
                                          <tspan x={viewBox.cx} y={viewBox.cy + 24} className="fill-muted-foreground">
                                            Stress Percent
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
        <div className="leading-none text-muted-foreground">Latest Stress Level</div>
      </CardFooter>
    </Card>
  );
}
