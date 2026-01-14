import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { WordCounts } from "./dataTypesSpec";

function computeSortedEntries(wordCounts: WordCounts): [string, number][] {
  return Object.entries(wordCounts.countToWordMap).sort((a, b) => b[1] - a[1]);
}

function quartileColor(index: number, total: number): string {
  const q = Math.floor(total / 4);
  if (q > 0) {
    if (index < q) return "green"; // top quartile
    if (index >= total - q) return "red"; // bottom quartile
  }
  return "blue"; // middle
}

export function createBarChart(wordCounts: WordCounts): void {
  const entries = computeSortedEntries(wordCounts);
  const n = entries.length;
  if (n === 0) return;

  const width = 900;
  const leftPad = 160;
  const rightPad = 40;
  const topPad = 40;
  const barHeight = 18;
  const gap = 10;
  const height = topPad + n * (barHeight + gap) + 40;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  ctx.font = "12px sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";

  const maxCount = Math.max(...entries.map(([, c]) => c));
  const chartWidth = width - leftPad - rightPad;

  entries.forEach(([word, count], i) => {
    const y = topPad + i * (barHeight + gap);
    const barW = (count / maxCount) * chartWidth;

    // bar
    ctx.fillStyle = quartileColor(i, n);
    ctx.fillRect(leftPad, y, barW, barHeight);

    // labels
    ctx.fillStyle = "black";
    ctx.fillText(word, 10, y + barHeight / 2);
    ctx.fillText(String(count), leftPad + barW + 5, y + barHeight / 2);
  });

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_bar.png", buffer);
}

export function createPieChart(wordCounts: WordCounts): void {
  const entries = computeSortedEntries(wordCounts);
  const n = entries.length;
  if (n === 0) return;

  const width = 800;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.35;

  const total = entries.reduce((acc, [, c]) => acc + c, 0);
  let angle = -Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const [, count] = entries[i];
    const slice = (count / total) * Math.PI * 2;
    const nextAngle = angle + slice;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, nextAngle);
    ctx.closePath();
    ctx.fillStyle = quartileColor(i, n);
    ctx.fill();

    angle = nextAngle;
  }

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_pie.png", buffer);
}

export function createLineChart(wordCounts: WordCounts): void {
  const entries = computeSortedEntries(wordCounts);
  const n = entries.length;
  if (n === 0) return;

  const width = 900;
  const height = 500;
  const leftPad = 60;
  const rightPad = 30;
  const topPad = 30;
  const bottomPad = 40;
  const plotW = width - leftPad - rightPad;
  const plotH = height - topPad - bottomPad;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // axes
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(leftPad, topPad);
  ctx.lineTo(leftPad, topPad + plotH);
  ctx.lineTo(leftPad + plotW, topPad + plotH);
  ctx.stroke();

  const maxCount = Math.max(...entries.map(([, c]) => c));
  const xStep = n > 1 ? plotW / (n - 1) : 0;

  function xy(i: number, count: number): [number, number] {
    const x = leftPad + i * xStep;
    const y = topPad + (1 - count / maxCount) * plotH;
    return [x, y];
  }

  const q = Math.floor(n / 4);
  const ranges: Array<{ start: number; end: number; color: string }> = [];

  if (q > 0) ranges.push({ start: 0, end: q - 1, color: "green" });
  const midStart = q > 0 ? q : 0;
  const midEnd = q > 0 ? n - q - 1 : n - 1;
  if (midStart <= midEnd) ranges.push({ start: midStart, end: midEnd, color: "blue" });
  if (q > 0) ranges.push({ start: n - q, end: n - 1, color: "red" });

  for (const { start, end, color } of ranges) {
    if (start > end) continue;
    ctx.beginPath();
    ctx.strokeStyle = color;
    for (let i = start; i <= end; i++) {
      const [, count] = entries[i];
      const [x, y] = xy(i, count);
      if (i === start) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_line.png", buffer);
}
