"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartData = [
  { title: "tokens-allocated", visitors: 275, fill: "#2E99E5" },
  { title: "hard-cap", visitors: 200, fill: "#C55C0B" },
  { title: "soft-cap", visitors: 187, fill: "#925FB8" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  "tokens-allocated": {
    label: "Tokens Allocated",
    color: "#2E99E5",
  },
  "hard-cap": {
    label: "Hard Cap",
    color: "#C55C0B",
  },
  "soft-cap": {
    label: "Soft Cap",
    color: "#925FB8",
  },
} satisfies ChartConfig

export function ChartPieDonut() {
  return (
    // <Card className="flex flex-col p-0 bg-transparent -mt-10 -mb-5">
    <Card className="flex flex-col p-0 bg-transparent -mt-8 lg:-mt-10 lg:-mb-5">
      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-38 w-38" >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel  className="border-0 text-[#2E99E5] bg-[#E4F9FE] p-1 rounded text-base"/>} />
            <Pie 
              data={chartData}
              dataKey="visitors"
              nameKey="title"
              innerRadius={45}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}