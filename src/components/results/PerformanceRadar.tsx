"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PerformanceData {
  label: string;
  value: number;
  maxValue?: number;
}

interface PerformanceRadarProps {
  data: PerformanceData[];
  size?: number;
  showLabels?: boolean;
  showValues?: boolean;
  animated?: boolean;
  colorScheme?: "primary" | "success" | "warning";
}

export function PerformanceRadar({
  data,
  size = 280,
  showLabels = true,
  showValues = true,
  animated = true,
  colorScheme = "primary",
}: PerformanceRadarProps) {
  const numPoints = data.length;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  const colorMap = {
    primary: {
      fill: "fill-indigo-500/30",
      stroke: "stroke-indigo-500",
      dot: "bg-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    success: {
      fill: "fill-emerald-500/30",
      stroke: "stroke-emerald-500",
      dot: "bg-emerald-500",
      gradient: "from-emerald-500 to-teal-500",
    },
    warning: {
      fill: "fill-amber-500/30",
      stroke: "stroke-amber-500",
      dot: "bg-amber-500",
      gradient: "from-amber-500 to-orange-500",
    },
  };

  const colors = colorMap[colorScheme];

  // Calculate points for the radar chart
  const getPointCoordinates = useMemo(() => {
    return (index: number, value: number, maxValue: number = 100): { x: number; y: number } => {
      const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
      const normalizedValue = value / maxValue;
      return {
        x: centerX + radius * normalizedValue * Math.cos(angle),
        y: centerY + radius * normalizedValue * Math.sin(angle),
      };
    };
  }, [numPoints, centerX, centerY, radius]);

  // Generate polygon points for the data
  const dataPoints = useMemo(() => {
    return data
      .map((d, i) => {
        const point = getPointCoordinates(i, d.value, d.maxValue);
        return `${point.x},${point.y}`;
      })
      .join(" ");
  }, [data, getPointCoordinates]);

  // Generate grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = gridLevels.map((level) => {
    return data
      .map((_, i) => {
        const point = getPointCoordinates(i, level * 100, 100);
        return `${point.x},${point.y}`;
      })
      .join(" ");
  });

  // Generate axis lines
  const axisLines = data.map((_, i) => {
    const point = getPointCoordinates(i, 100, 100);
    return { x1: centerX, y1: centerY, x2: point.x, y2: point.y };
  });

  // Label positions
  const labelPositions = data.map((d, i) => {
    const point = getPointCoordinates(i, 120, 100);
    return { ...point, label: d.label, value: d.value };
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid lines */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted/30"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted/30"
          />
        ))}

        {/* Data polygon */}
        <motion.polygon
          points={dataPoints}
          className={cn(colors.fill, colors.stroke)}
          strokeWidth="2"
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Data points */}
        {data.map((d, i) => {
          const point = getPointCoordinates(i, d.value, d.maxValue);
          return (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="5"
              className={cn("fill-white", colors.stroke)}
              strokeWidth="2"
              initial={animated ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            />
          );
        })}
      </svg>

      {/* Labels */}
      {showLabels &&
        labelPositions.map((pos, i) => {
          const isLeft = pos.x < centerX - 10;
          const isRight = pos.x > centerX + 10;
          const isTop = pos.y < centerY - 10;
          const isBottom = pos.y > centerY + 10;

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute text-xs font-medium whitespace-nowrap",
                isLeft && "text-right",
                isRight && "text-left",
                !isLeft && !isRight && "text-center"
              )}
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(${isLeft ? "-100%" : isRight ? "0" : "-50%"}, ${
                  isTop ? "-100%" : isBottom ? "0" : "-50%"
                })`,
              }}
              initial={animated ? { opacity: 0 } : {}}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-muted-foreground">{pos.label}</span>
              {showValues && (
                <span className={cn("ml-1 font-bold", colors.stroke.replace("stroke", "text"))}>
                  {pos.value}%
                </span>
              )}
            </motion.div>
          );
        })}

      {/* Center dot */}
      <motion.div
        className={cn(
          "absolute w-3 h-3 rounded-full",
          colors.dot
        )}
        style={{
          left: centerX - 6,
          top: centerY - 6,
        }}
        initial={animated ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
    </div>
  );
}

// Quick stat cards to display alongside radar
interface QuickStatProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function QuickStat({ label, value, subValue, trend, icon }: QuickStatProps) {
  const trendColors = {
    up: "text-emerald-500",
    down: "text-rose-500",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-xl bg-muted/50 p-3"
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">
          {label}
          {subValue && (
            <span className={cn("ml-1", trend && trendColors[trend])}>
              {subValue}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
