const VIEW_W = 1440;
const VIEW_H = 200;
const BAND_REM = 10;
const SAMPLE_COUNT = 72;

const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const cubic = (t: number, p0: number, p1: number, p2: number, p3: number) => {
  const u = 1 - t;
  return (
    u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  );
};

export const waveEdgeY = (x: number) => {
  const t = Math.min(1, Math.max(0, x / VIEW_W));
  if (t <= 0.5) {
    return cubic(t * 2, 92, 14, 176, 78);
  }
  return cubic((t - 0.5) * 2, 78, 8, 164, 70);
};

const curveSamples = Array.from({ length: 41 }, (_, i) => {
  const x = (i / 40) * VIEW_W;
  return { x, y: waveEdgeY(x) };
});

export const mastheadSmokeClip = (() => {
  const bottom = [...curveSamples]
    .reverse()
    .map(({ x, y }) => {
      const xPct = `${((x / VIEW_W) * 100).toFixed(2)}%`;
      const fromBottom = ((VIEW_H - y) / VIEW_H) * BAND_REM;
      const yClip =
        fromBottom <= 0.02
          ? "100%"
          : `calc(100% - ${fromBottom.toFixed(3)}rem)`;
      return `${xPct} ${yClip}`;
    })
    .join(", ");
  return `polygon(0% 0%, 100% 0%, ${bottom})`;
})();

const pointsToSmoothPath = (points: { x: number; y: number }[]) => {
  if (points.length < 2) {
    return "";
  }

  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    d += ` Q${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` T${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return d;
};

type SmokeLine = {
  d: string;
  opacity: number;
  stroke: string;
  width: number;
};

const makeRibbon = ({
  count,
  seed,
  spread,
  freq,
  phaseShift,
  invert,
}: {
  count: number;
  seed: number;
  spread: number;
  freq: number;
  phaseShift: number;
  invert?: boolean;
}): SmokeLine[] =>
  Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const offset = (t - 0.5) * spread;
    const phase = rand(seed + i) * Math.PI * 2 + phaseShift;
    const wobble = 5 + rand(seed + i + 9) * 16;
    const lineFreq = freq + rand(seed + i + 3) * 0.55;
    const points = Array.from({ length: SAMPLE_COUNT }, (_, s) => {
      const n = s / (SAMPLE_COUNT - 1);
      const x = n * VIEW_W;
      const pinch = 1 + Math.sin(n * Math.PI * 2 + phase) * 0.32;
      const drift =
        Math.sin(n * Math.PI * lineFreq + phase) *
        wobble *
        (0.25 + Math.sin(n * Math.PI) * 0.75);
      const cross = invert
        ? Math.sin(n * Math.PI * 1.15 + phase) * (spread * 0.22)
        : 0;
      return {
        x,
        y: waveEdgeY(x) + offset * pinch + drift + cross,
      };
    });

    const mid = Math.abs(t - 0.5);
    const density = 1 - mid * 1.65;
    return {
      d: pointsToSmoothPath(points),
      opacity: Math.max(0.08, 0.12 + density * 0.28),
      stroke: rand(seed + i + 21) > 0.55 ? "#f4f4f5" : "#d4d4d8",
      width: mid < 0.12 ? 1.05 : mid < 0.28 ? 0.7 : 0.42,
    };
  });

const smokeLines: SmokeLine[] = [
  ...makeRibbon({
    count: 42,
    seed: 1,
    spread: 78,
    freq: 1.15,
    phaseShift: 0.2,
  }),
  ...makeRibbon({
    count: 22,
    seed: 80,
    spread: 54,
    freq: 1.7,
    phaseShift: 1.8,
    invert: true,
  }),
];

const MastheadSmokeWave = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full overflow-visible"
    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    preserveAspectRatio="none"
  >
    {smokeLines.map((line, index) => (
      <path
        key={index}
        d={line.d}
        fill="none"
        stroke={line.stroke}
        strokeOpacity={line.opacity}
        strokeWidth={line.width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    ))}
  </svg>
);

export default MastheadSmokeWave;
