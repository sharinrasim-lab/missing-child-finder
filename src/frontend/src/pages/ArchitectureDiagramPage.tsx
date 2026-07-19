import { Button } from "@/components/ui/button";
import { Download, FileCode } from "lucide-react";
import { useRef } from "react";

const SVG_W = 1400;
const SVG_H = 900;

// ── colour palette ─────────────────────────────────────────────────────────────
const C = {
  bg: "#F8FAFC",
  l1: "#3B82F6", // Client – blue
  l1light: "#DBEAFE",
  l2: "#8B5CF6", // AI/ML – purple
  l2light: "#EDE9FE",
  l3: "#06B6D4", // Agent – cyan
  l3light: "#CFFAFE",
  l4: "#10B981", // Backend – green
  l4light: "#D1FAE5",
  l5: "#F59E0B", // Storage – amber
  l5light: "#FEF3C7",
  l6: "#64748B", // External – slate
  l6light: "#F1F5F9",
  arrow: "#94A3B8",
  text: "#1E293B",
  white: "#FFFFFF",
  matchGreen: "#22C55E",
  matchAmber: "#F59E0B",
  matchGray: "#9CA3AF",
};

// ── SVG helpers ────────────────────────────────────────────────────────────────
function Rect({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  r = 8,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  r?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      ry={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
    />
  );
}

function Label({
  x,
  y,
  text,
  size = 12,
  weight = "normal",
  fill = C.text,
  anchor = "middle",
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  weight?: string;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      fontFamily="Arial, Helvetica, sans-serif"
      dominantBaseline="middle"
    >
      {text}
    </text>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={C.arrow}
      strokeWidth={1.5}
      markerEnd="url(#arrowhead)"
      strokeDasharray="4 2"
    />
  );
}

// ── Module box (small chip inside a layer) ─────────────────────────────────────
function Chip({
  x,
  y,
  w,
  h,
  bg,
  border,
  label,
  sublabel,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
  border: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <g>
      <Rect x={x} y={y} w={w} h={h} fill={bg} stroke={border} r={6} />
      <Label
        x={x + w / 2}
        y={y + (sublabel ? h / 2 - 7 : h / 2)}
        text={label}
        size={10}
        weight="bold"
        fill={C.text}
      />
      {sublabel && (
        <Label
          x={x + w / 2}
          y={y + h / 2 + 7}
          text={sublabel}
          size={9}
          fill="#475569"
        />
      )}
    </g>
  );
}

// ── Layer header band ──────────────────────────────────────────────────────────
function LayerBand({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  num,
  title,
  subtitle,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <g>
      <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} r={10} />
      <Label
        x={x + 14}
        y={y + (subtitle ? h / 2 - 8 : h / 2)}
        text={`${num}`}
        size={11}
        weight="bold"
        fill={stroke}
        anchor="start"
      />
      <Label
        x={x + 36}
        y={y + (subtitle ? h / 2 - 8 : h / 2)}
        text={title}
        size={11}
        weight="bold"
        fill={stroke}
        anchor="start"
      />
      {subtitle && (
        <Label
          x={x + 36}
          y={y + h / 2 + 8}
          text={subtitle}
          size={9}
          fill="#64748B"
          anchor="start"
        />
      )}
    </g>
  );
}

// ── Main diagram SVG ───────────────────────────────────────────────────────────
function DiagramSvg({
  svgRef,
}: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  // Layout constants
  const PAD = 20;
  const LW = SVG_W - PAD * 2; // full-width layers
  const COL_MID = SVG_W / 2;

  // Row Y positions (top of each layer band)
  const ROW = [
    46, // L1 Client
    182, // L2 AI/ML
    338, // L3 Agent
    470, // L4 Backend
    620, // L5 Storage
    745, // L6 External
  ];
  const BAND_H = 28;

  // Column widths for chip grids
  const chipW = 156;
  const chipH = 44;
  const chipGap = 12;

  // Columns for L1 pages (6 chips)
  const l1Pages = [
    "Auth",
    "Dashboard",
    "Register",
    "Search",
    "Admin",
    "Account",
  ];
  const l1ChipW = (LW - chipGap * 7) / 6;
  const l1ChipY = ROW[0] + BAND_H + 10;

  // L2 AI chips
  const l2ChipY = ROW[1] + BAND_H + 10;
  const l2ChipH = 52;

  // L3 Agent chips
  const l3ChipY = ROW[2] + BAND_H + 10;

  // L4 Backend method chips
  const l4ChipY = ROW[3] + BAND_H + 10;

  // L5 storage chips
  const l5ChipY = ROW[4] + BAND_H + 10;

  // L6 external chips
  const l6ChipY = ROW[5] + BAND_H + 10;

  // Score tier Y
  const scoreY = 858;

  return (
    <svg
      ref={svgRef as React.RefObject<SVGSVGElement>}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      style={{ display: "block", background: C.bg }}
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="arch-svg-title"
      role="img"
    >
      <title id="arch-svg-title">
        Missing Child Finder — System Architecture Diagram
      </title>
      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={C.arrow} />
        </marker>
      </defs>

      {/* Background */}
      <rect width={SVG_W} height={SVG_H} fill={C.bg} />

      {/* ── TITLE ──────────────────────────────────────────────────────────── */}
      <Label
        x={COL_MID}
        y={22}
        text="Missing Child Finder — System Architecture"
        size={16}
        weight="bold"
        fill={C.text}
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 1 — CLIENT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[0]}
        w={LW}
        h={130}
        fill={C.l1light}
        stroke={C.l1}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[0]}
        w={LW}
        h={BAND_H}
        fill={C.l1}
        stroke={C.white}
        num="LAYER 1"
        title="CLIENT LAYER (Browser)"
        subtitle="React 19 + TypeScript + Tailwind CSS  |  Canister: y5t77-rqaaa-aaaao-qmlgq-cai"
      />
      {l1Pages.map((page, i) => {
        const cw = l1ChipW;
        const cx = PAD + chipGap + i * (cw + chipGap);
        return (
          <Chip
            key={page}
            x={cx}
            y={l1ChipY}
            w={cw}
            h={chipH}
            bg={C.white}
            border={C.l1}
            label={page}
            sublabel="Page"
          />
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 2 — AI/ML ENGINE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[1]}
        w={LW}
        h={146}
        fill={C.l2light}
        stroke={C.l2}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[1]}
        w={LW}
        h={BAND_H}
        fill={C.l2}
        stroke={C.white}
        num="LAYER 2"
        title="AI / ML ENGINE (Browser-Native)"
        subtitle="All detection strategies run in parallel via Promise.all()"
      />

      {/* face-api.js chip */}
      <Chip
        x={PAD + chipGap}
        y={l2ChipY}
        w={chipW + 20}
        h={l2ChipH}
        bg={C.white}
        border={C.l2}
        label="face-api.js"
        sublabel="CNN 128-dim · 68-pt landmarks"
      />
      {/* BlazeFace */}
      <Chip
        x={PAD + chipGap + (chipW + 20 + chipGap)}
        y={l2ChipY}
        w={chipW + 20}
        h={l2ChipH}
        bg={C.white}
        border={C.l2}
        label="BlazeFace (TF.js)"
        sublabel="Fast face crop"
      />
      {/* YOLOv8 */}
      <Chip
        x={PAD + chipGap + 2 * (chipW + 20 + chipGap)}
        y={l2ChipY}
        w={chipW + 20}
        h={l2ChipH}
        bg={C.white}
        border={C.l2}
        label="YOLOv8-ONNX"
        sublabel="onnxruntime-web@1.18.0"
      />
      {/* Age Progression */}
      <Chip
        x={PAD + chipGap + 3 * (chipW + 20 + chipGap)}
        y={l2ChipY}
        w={chipW + 40}
        h={l2ChipH}
        bg={C.white}
        border={C.l2}
        label="Age Progression"
        sublabel="5 variants · -0.4→+1.2yr"
      />
      {/* Matching Formula */}
      <Chip
        x={PAD + chipGap + 3 * (chipW + 20 + chipGap) + (chipW + 40 + chipGap)}
        y={l2ChipY}
        w={chipW + 60}
        h={l2ChipH}
        bg={C.white}
        border={C.l2}
        label="Matching Ensemble"
        sublabel="55% CNN + 20% Landmarks + 25% Aux"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 3 — ICP AGENT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[2]}
        w={LW}
        h={122}
        fill={C.l3light}
        stroke={C.l3}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[2]}
        w={LW}
        h={BAND_H}
        fill={C.l3}
        stroke={C.white}
        num="LAYER 3"
        title="ICP AGENT LAYER"
        subtitle="Bridges browser to backend canister"
      />

      <Chip
        x={PAD + chipGap}
        y={l3ChipY}
        w={chipW + 10}
        h={chipH}
        bg={C.white}
        border={C.l3}
        label="useActor Hook"
        sublabel="actor + isFetching"
      />
      <Chip
        x={PAD + chipGap * 2 + (chipW + 10)}
        y={l3ChipY}
        w={chipW + 10}
        h={chipH}
        bg={C.white}
        border={C.l3}
        label="ICP Agent"
        sublabel="@dfinity/agent"
      />
      <Chip
        x={PAD + chipGap * 3 + 2 * (chipW + 10)}
        y={l3ChipY}
        w={chipW + 30}
        h={chipH}
        bg={C.white}
        border={C.l3}
        label="Photo Compress"
        sublabel="HTML5 Canvas · <200KB"
      />
      <Chip
        x={PAD + chipGap * 4 + 3 * (chipW + 10) + 20}
        y={l3ChipY}
        w={chipW + 80}
        h={chipH}
        bg={C.white}
        border={C.l3}
        label="Auto-Retry IC0508"
        sublabel="4× backoff · 1/2/4/8s"
      />
      <Chip
        x={PAD + chipGap * 5 + 4 * (chipW + 10) + 100}
        y={l3ChipY}
        w={chipW + 10}
        h={chipH}
        bg={C.white}
        border={C.l3}
        label="React Query"
        sublabel="TanStack Query v5"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 4 — MOTOKO BACKEND */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[3]}
        w={LW}
        h={140}
        fill={C.l4light}
        stroke={C.l4}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[3]}
        w={LW}
        h={BAND_H}
        fill={C.l4}
        stroke={C.white}
        num="LAYER 4"
        title="MOTOKO BACKEND (ICP Canister)"
        subtitle="Canister ID: 6h4dx-aqaaa-aaaas-qgcla-cai"
      />

      {/* Method chips in 2 rows */}
      {[
        { label: "registerCase()", sub: "store case + photo" },
        { label: "getCases()", sub: "fetch all records" },
        { label: "updateCaseStatus()", sub: "Active/Found/Closed" },
        { label: "deleteCase()", sub: "remove record" },
      ].map((m, i) => (
        <Chip
          key={m.label}
          x={PAD + chipGap + i * (chipW + 20 + chipGap)}
          y={l4ChipY}
          w={chipW + 20}
          h={chipH}
          bg={C.white}
          border={C.l4}
          label={m.label}
          sublabel={m.sub}
        />
      ))}
      {[
        { label: "getDashboardStats()", sub: "counts by status" },
        { label: "logAlert()", sub: "contact + caseId" },
        { label: "getUserRole()", sub: "user | admin" },
        { label: "isCallerAdmin()", sub: "boolean check" },
      ].map((m, i) => (
        <Chip
          key={m.label}
          x={PAD + chipGap + i * (chipW + 20 + chipGap)}
          y={l4ChipY + chipH + 8}
          w={chipW + 20}
          h={chipH}
          bg={C.white}
          border={C.l4}
          label={m.label}
          sublabel={m.sub}
        />
      ))}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 5 — STABLE STORAGE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[4]}
        w={LW}
        h={116}
        fill={C.l5light}
        stroke={C.l5}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[4]}
        w={LW}
        h={BAND_H}
        fill={C.l5}
        stroke={C.white}
        num="LAYER 5"
        title="STABLE STORAGE"
        subtitle="ICP Stable Memory · 512 GB allocated"
      />

      {[
        { label: "Cases Table", sub: "case records" },
        { label: "Blob Storage", sub: "compressed photos" },
        { label: "User Profiles", sub: "principal → profile" },
        { label: "Role Map", sub: "principal → role" },
        { label: "Stable Vars", sub: "Motoko upgrades" },
      ].map((s, i) => (
        <Chip
          key={s.label}
          x={PAD + chipGap + i * (chipW + chipGap)}
          y={l5ChipY}
          w={chipW}
          h={chipH}
          bg={C.white}
          border={C.l5}
          label={s.label}
          sublabel={s.sub}
        />
      ))}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 6 — EXTERNAL SERVICES */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Rect
        x={PAD}
        y={ROW[5]}
        w={LW}
        h={100}
        fill={C.l6light}
        stroke={C.l6}
        r={10}
      />
      <LayerBand
        x={PAD}
        y={ROW[5]}
        w={LW}
        h={BAND_H}
        fill={C.l6}
        stroke={C.white}
        num="LAYER 6"
        title="EXTERNAL SERVICES"
      />

      {/* II chip */}
      <Chip
        x={PAD + chipGap}
        y={l6ChipY}
        w={chipW + 40}
        h={chipH}
        bg={C.white}
        border={C.l6}
        label="Internet Identity"
        sublabel="Biometric / Security Key"
      />
      {/* CDN chain */}
      <Chip
        x={PAD + chipGap * 2 + (chipW + 40)}
        y={l6ChipY}
        w={chipW + 200}
        h={chipH}
        bg={C.white}
        border={C.l6}
        label="CDN Fallback Chain (×6)"
        sublabel="face-api.js weights · BlazeFace · YOLOv8-ONNX models"
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SCORE TIERS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Label
        x={COL_MID}
        y={scoreY - 8}
        text="Match Score Tiers"
        size={11}
        weight="bold"
        fill={C.text}
      />
      {[
        { label: "≥65 — Match Found", bg: "#DCFCE7", border: C.matchGreen },
        {
          label: "40–64 — Possible Match",
          bg: "#FEF9C3",
          border: C.matchAmber,
        },
        { label: "1–39 — Low Similarity", bg: "#F3F4F6", border: C.matchGray },
        { label: "0 — Closest Visual", bg: "#F3F4F6", border: C.matchGray },
        { label: "No Face — Not Detected", bg: "#F3F4F6", border: C.matchGray },
      ].map((t, i) => {
        const tw = 220;
        const tgap = 12;
        const totalW = 5 * tw + 4 * tgap;
        const startX = (SVG_W - totalW) / 2;
        return (
          <g key={t.label}>
            <Rect
              x={startX + i * (tw + tgap)}
              y={scoreY + 4}
              w={tw}
              h={26}
              fill={t.bg}
              stroke={t.border}
              r={5}
            />
            <Label
              x={startX + i * (tw + tgap) + tw / 2}
              y={scoreY + 17}
              text={t.label}
              size={10}
              fill={C.text}
            />
          </g>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* VERTICAL ARROWS between layers */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* L1 → L2: not really (both browser), use annotation */}
      <Arrow x1={COL_MID} y1={ROW[0] + 130} x2={COL_MID} y2={ROW[1]} />
      <Arrow x1={COL_MID} y1={ROW[1] + 146} x2={COL_MID} y2={ROW[2]} />
      <Arrow x1={COL_MID} y1={ROW[2] + 122} x2={COL_MID} y2={ROW[3]} />
      <Arrow x1={COL_MID} y1={ROW[3] + 140} x2={COL_MID} y2={ROW[4]} />
      <Arrow x1={COL_MID} y1={ROW[4] + 116} x2={COL_MID} y2={ROW[5]} />

      {/* Label arrows */}
      <Label
        x={COL_MID + 8}
        y={(ROW[0] + 130 + ROW[1]) / 2}
        text="face detection calls"
        size={9}
        fill={C.l2}
        anchor="start"
      />
      <Label
        x={COL_MID + 8}
        y={(ROW[1] + 146 + ROW[2]) / 2}
        text="actor calls via ICP Agent"
        size={9}
        fill={C.l3}
        anchor="start"
      />
      <Label
        x={COL_MID + 8}
        y={(ROW[2] + 122 + ROW[3]) / 2}
        text="Candid RPC"
        size={9}
        fill={C.l4}
        anchor="start"
      />
      <Label
        x={COL_MID + 8}
        y={(ROW[3] + 140 + ROW[4]) / 2}
        text="stable memory reads/writes"
        size={9}
        fill={C.l5}
        anchor="start"
      />
      <Label
        x={COL_MID + 8}
        y={(ROW[4] + 116 + ROW[5]) / 2}
        text="auth delegation · model fetch"
        size={9}
        fill={C.l6}
        anchor="start"
      />
    </svg>
  );
}

// ── Page component ─────────────────────────────────────────────────────────────
export default function ArchitectureDiagramPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const downloadSvg = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "architecture-diagram.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    // Ensure xmlns is declared for standalone SVG
    if (!source.includes("xmlns=")) {
      source = source.replace(
        "<svg",
        '<svg xmlns="http://www.w3.org/2000/svg"',
      );
    }

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = SVG_W * 2; // 2× for retina quality
      canvas.height = SVG_H * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return;
      }
      ctx.scale(2, 2);
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(0, 0, SVG_W, SVG_H);
      ctx.drawImage(img, 0, 0, SVG_W, SVG_H);
      URL.revokeObjectURL(url);

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "architecture-diagram.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert("PNG export failed — please use Download SVG instead.");
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 bg-card border-b border-border px-6 py-3 flex items-center justify-between shadow-sm"
        data-ocid="arch-header"
      >
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">
            Missing Child Finder — System Architecture
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            6-layer diagram · React frontend → AI engine → ICP canister → stable
            storage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadSvg}
            data-ocid="download-svg-btn"
          >
            <FileCode className="w-4 h-4 mr-1.5" />
            Download SVG
          </Button>
          <Button size="sm" onClick={downloadPng} data-ocid="download-png-btn">
            <Download className="w-4 h-4 mr-1.5" />
            Download PNG
          </Button>
        </div>
      </div>

      {/* Diagram container */}
      <div
        className="p-4 md:p-6 overflow-x-auto"
        data-ocid="arch-diagram-container"
      >
        <div className="min-w-[900px]">
          <DiagramSvg svgRef={svgRef} />
        </div>
      </div>
    </div>
  );
}
