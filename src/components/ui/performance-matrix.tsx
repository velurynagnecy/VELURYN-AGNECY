"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MatrixMetric {
  id: string;
  label: string;
  value: number; // percentage (0-100)
  color?: string;
}

const DEFAULT_METRICS: MatrixMetric[] = [
  { id: "ugc", label: "UGC Content", value: 96 },
  { id: "influencer", label: "Influencer", value: 94 },
  { id: "ai", label: "AI Visuals", value: 98 },
  { id: "performance", label: "Performance Ads", value: 92 },
  { id: "talent", label: "Talent Network", value: 91 },
  { id: "brand", label: "Brand & Creative", value: 95 },
];

interface PerformanceMatrixProps {
  metrics?: MatrixMetric[];
  activeId?: string | null;
  onSelectMetric?: (id: string) => void;
  className?: string;
}

export function PerformanceMatrix({
  metrics = DEFAULT_METRICS,
  activeId,
  onSelectMetric,
  className,
}: PerformanceMatrixProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Geometric calculations for 6-point radar (center 200, 180, radius 120)
  const cx = 200;
  const cy = 175;
  const maxR = 115;
  const total = metrics.length;

  const getCoordinates = (index: number, radius: number) => {
    // Start at top (-90 degrees)
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      angle,
    };
  };

  // Generate polygon points for a given scale (0 to 1)
  const getGridPoints = (scale: number) => {
    return metrics
      .map((_, i) => {
        const { x, y } = getCoordinates(i, maxR * scale);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  // Generate polygon points for actual data values
  const dataPoints = metrics
    .map((m, i) => {
      const r = (m.value / 100) * maxR;
      const { x, y } = getCoordinates(i, r);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const activeOrHovered = hoveredMetric || activeId;

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-neutral-900 text-white p-6 md:p-8 shadow-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 bg-white/[0.04] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight !text-[#EBF3FF]" style={{ color: '#EBF3FF' }}>
            Capability Matrix
          </h3>
          <p className="text-xs md:text-sm !text-[#D8E6FC] mt-0.5" style={{ color: '#D8E6FC' }}>
            Full-funnel creative distribution across 6 core pillars
          </p>
        </div>

        {/* Aggregate Badge */}
        <div className="text-right shrink-0">
          <div className="text-xl md:text-2xl font-extrabold font-mono tracking-tight text-[#FFD504]">
            6 Pillars
          </div>
          <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
            Full-Stack Scope
          </span>
        </div>
      </div>

      {/* Radar SVG Visual */}
      <div className="relative w-full aspect-[400/340] max-h-[340px] flex items-center justify-center my-2">
        <svg
          viewBox="0 0 400 350"
          className="w-full h-full overflow-visible select-none"
        >
          <defs>
            {/* Glowing fill for the data radar polygon */}
            <linearGradient id="radar-glow-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD504" stopOpacity={0.38} />
              <stop offset="50%" stopColor="#0B5FFF" stopOpacity={0.24} />
              <stop offset="100%" stopColor="#0d3eee" stopOpacity={0.1} />
            </linearGradient>

            {/* Sweep Beam Gradient */}
            <radialGradient id="radar-sweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD504" stopOpacity={0.25} />
              <stop offset="70%" stopColor="#0B5FFF" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#163dcb" stopOpacity={0} />
            </radialGradient>

            {/* Filter for glowing vertices */}
            <filter id="vertex-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Rotating Radar Sweep Line */}
          <g transform={`translate(${cx}, ${cy})`}>
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2={-maxR}
              stroke="url(#radar-glow-fill)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "0px", originY: "0px" }}
            />
          </g>

          {/* Concentric Grid Polygons */}
          {[1.0, 0.75, 0.5, 0.25].map((scale, sIdx) => (
            <polygon
              key={sIdx}
              points={getGridPoints(scale)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray={scale < 1.0 ? "3 3" : undefined}
            />
          ))}

          {/* Axis Spoke Lines */}
          {metrics.map((_, i) => {
            const { x, y } = getCoordinates(i, maxR);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Active / Filled Polygon with Spring Motion */}
          <motion.polygon
            points={dataPoints}
            fill="url(#radar-glow-fill)"
            stroke="#FFD504"
            strokeWidth="2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Vertex Nodes & Interactive Labels */}
          {metrics.map((m, i) => {
            const r = (m.value / 100) * maxR;
            const node = getCoordinates(i, r);
            const labelCoord = getCoordinates(i, maxR + 26);
            const isSelected = activeOrHovered === m.id;

            return (
              <g
                key={m.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredMetric(m.id)}
                onMouseLeave={() => setHoveredMetric(null)}
                onClick={() => onSelectMetric?.(m.id)}
              >
                {/* Outer Pulse Ring when selected */}
                {isSelected && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    fill="none"
                    stroke="#FFD504"
                    strokeWidth="1.5"
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* Node Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? "#FFD504" : "#0B5FFF"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter={isSelected ? "url(#vertex-glow)" : undefined}
                  className="transition-all duration-200"
                />

                {/* Label Text */}
                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(
                    "text-[11px] md:text-xs font-medium transition-colors select-none",
                    isSelected
                      ? "fill-white font-bold"
                      : "fill-neutral-400 hover:fill-neutral-200"
                  )}
                >
                  {m.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Operational Guarantees Row */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-neutral-800/80 mt-2">
        <div className="bg-neutral-800/40 rounded-xl p-2.5 text-center">
          <div className="text-xs md:text-sm font-bold font-mono text-white">50 / 50</div>
          <div className="text-[10px] text-neutral-400 font-medium">Deposit Protected</div>
        </div>
        <div className="bg-neutral-800/40 rounded-xl p-2.5 text-center">
          <div className="text-xs md:text-sm font-bold font-mono text-white">100%</div>
          <div className="text-[10px] text-neutral-400 font-medium">Vetted Roster</div>
        </div>
        <div className="bg-neutral-800/40 rounded-xl p-2.5 text-center">
          <div className="text-xs md:text-sm font-bold font-mono text-white">EN / TA</div>
          <div className="text-[10px] text-neutral-400 font-medium">Bilingual Studio</div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMatrix;
