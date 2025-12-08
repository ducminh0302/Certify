"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ZoomIn, ZoomOut, Maximize2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with custom theme
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#6366f1",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#4f46e5",
    lineColor: "#94a3b8",
    secondaryColor: "#f1f5f9",
    tertiaryColor: "#e2e8f0",
    background: "#ffffff",
    mainBkg: "#6366f1",
    nodeBorder: "#4f46e5",
    clusterBkg: "#f8fafc",
    clusterBorder: "#e2e8f0",
    titleColor: "#1e293b",
    edgeLabelBackground: "#ffffff",
    nodeTextColor: "#1e293b",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
    padding: 15,
  },
  fontFamily: "inherit",
});

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart || !containerRef.current) return;

      try {
        // Clean the chart string
        const cleanChart = chart.trim();
        const id = `mermaid-${Date.now()}`;

        const { svg: renderedSvg } = await mermaid.render(id, cleanChart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setError("Could not render diagram. The syntax may be invalid.");
        setSvg("");
      }
    };

    renderDiagram();
  }, [chart]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!svg) return;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagram.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className={cn("rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-4", className)}>
        <p className="text-sm text-amber-800 dark:text-amber-200">{error}</p>
        <details className="mt-2">
          <summary className="text-xs text-amber-600 dark:text-amber-400 cursor-pointer">
            View code
          </summary>
          <pre className="mt-2 text-xs bg-amber-100 dark:bg-amber-900/40 p-2 rounded overflow-x-auto">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className={cn("rounded-lg border bg-muted/50 p-8 flex items-center justify-center", className)}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-lg border bg-card overflow-hidden", className)}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">Diagram</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleZoomIn}
            disabled={zoom >= 2}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleResetZoom}
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopyCode}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleDownload}
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Diagram */}
      <div
        ref={containerRef}
        className="p-4 overflow-auto bg-white dark:bg-slate-950"
        style={{ maxHeight: "400px" }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            transition: "transform 0.2s ease",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
          className="[&_svg]:max-w-full"
        />
      </div>
    </motion.div>
  );
}

// Helper to extract mermaid code from markdown code blocks
export function extractMermaidCode(content: string): string[] {
  const mermaidBlocks: string[] = [];
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    mermaidBlocks.push(match[1].trim());
  }

  return mermaidBlocks;
}

// Check if content contains mermaid diagrams
export function hasMermaidDiagram(content: string): boolean {
  return /```mermaid/i.test(content);
}
