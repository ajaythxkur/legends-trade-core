"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  percentage: number
  size?: "sm" | "md" | "lg" | "xl"
  strokeWidth?: number
  color?: "purple" | "blue" | "green" | "orange" | "red"
  showPercentage?: boolean
  className?: string
}

export default function CircularProgress({
  percentage,
  size = "md",
  strokeWidth = 8,
  color = "red",
  showPercentage = false,
  className,
}: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  const sizeMap = {
    sm: 44,
    md: 80,
    lg: 120,
    xl: 160,
  }

  const colorMap = {
    // purple: "#8B5CF6",
    purple: "#6750A4",
    blue: "#3B82F6",
    green: "#10B981",
    orange: "#F59E0B",
    red: "#EF4444",
  }

  const radius = (sizeMap[size] - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="transform -rotate-90"
        viewBox={`0 0 ${sizeMap[size]} ${sizeMap[size]}`}
      >
        {/* Background circle */}
        <circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />

        {/* Progress circle */}
        <circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">{Math.round(animatedPercentage)}%</span>
        </div>
      )}
    </div>
  )
}
