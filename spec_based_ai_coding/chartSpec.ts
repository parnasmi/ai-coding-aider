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

/**
 * Creates a bubble chart where each word is represented by a circle.
 * The size of the bubble is proportional to the word count, with exaggerated scaling.
 * Bubbles are colored based on their frequency quartile (top=green, bottom=red, middle=blue).
 * The word text is centered within each bubble.
 * The resulting chart is saved as 'word_count_chart_bubble.png'.
 * 
 * @param wordCounts - The word frequency data to visualize.
 */
export function createBubbleChart(wordCounts: WordCounts): void {
  const entries = computeSortedEntries(wordCounts);
  const n = entries.length;
  if (n === 0) return;

  // Increased canvas size to accommodate larger bubbles
  const width = 2000;
  const height = 2000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill background with white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  const maxCount = Math.max(...entries.map(([, c]) => c));
  
  // Increased margins and padding x2
  let curX = 120;
  let curY = 120;
  let maxRowHeight = 0;
  const padding = 40;

  entries.forEach(([word, count], i) => {
    // Exaggerate bubble sizes by using a combination of linear and base size
    // Increased sizes x2
    const radius = ((count / maxCount) * 80 + 20) * 2;
    const diameter = radius * 2;

    // Wrap to next row if we exceed canvas width
    if (curX + diameter > width - 120) {
      curX = 120;
      curY += maxRowHeight + padding;
      maxRowHeight = 0;
    }

    // If we exceed canvas height, we stop drawing
    if (curY + diameter > height - 120) return;

    const centerX = curX + radius;
    const centerY = curY + radius;

    // Draw the bubble with quartile color and some transparency
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = quartileColor(i, n);
    ctx.globalAlpha = 0.7;
    ctx.fill();
    
    // Draw bubble border
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Overlay the word in the center
    ctx.fillStyle = "black";
    // Adjust font size based on bubble radius
    const fontSize = Math.max(10, radius / 2.5);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Simple text clipping/truncation if word is too long for bubble
    let displayWord = word;
    if (ctx.measureText(word).width > diameter - 20) {
        displayWord = word.substring(0, Math.floor(radius / 5)) + "..";
    }
    ctx.fillText(displayWord, centerX, centerY);

    curX += diameter + padding;
    maxRowHeight = Math.max(maxRowHeight, diameter);
  });

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_bubble.png", buffer);
}

/**
 * Creates a 'top-pie' pie chart of word counts where the top three words are exploded for emphasis.
 * The chart is saved as 'word_count_chart_top_pie.png'.
 * 
 * This function calculates the total word count, then iterates through each word to draw its
 * corresponding slice in the pie chart. For the top three most frequent words, the slice is
 * shifted outwards (exploded) from the center of the chart along its bisector angle to provide visual emphasis.
 * 
 * @param wordCounts - The word frequency data to visualize.
 */
export function createTopPieChart(wordCounts: WordCounts): void {
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
  const explodeDistance = 30;

  const total = entries.reduce((acc, [, c]) => acc + c, 0);
  let angle = -Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const [, count] = entries[i];
    const slice = (count / total) * Math.PI * 2;
    const nextAngle = angle + slice;

    let currentCx = cx;
    let currentCy = cy;

    // Explode top 3 slices
    if (i < 3) {
      const bisectorAngle = angle + slice / 2;
      currentCx += Math.cos(bisectorAngle) * explodeDistance;
      currentCy += Math.sin(bisectorAngle) * explodeDistance;
    }

    ctx.beginPath();
    ctx.moveTo(currentCx, currentCy);
    ctx.arc(currentCx, currentCy, radius, angle, nextAngle);
    ctx.closePath();
    ctx.fillStyle = quartileColor(i, n);
    ctx.fill();

    angle = nextAngle;
  }

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_top_pie.png", buffer);
}

/**
 * Creates a radial bar chart of word counts where each word is represented by a bar
 * arranged around a circle. The angular width of each bar is constant, while its radial
 * length is proportional to the word count. Bars are colored by frequency quartile
 * (top=green, bottom=red, middle=blue). Word labels are placed just outside the bar tip.
 *
 * Saves the chart as 'word_count_chart_radial_bar.png'.
 *
 * @param wordCounts - The word frequency data to visualize.
 */
export function createRadialBarChart(wordCounts: WordCounts): void {
  const entries = computeSortedEntries(wordCounts);
  const n = entries.length;
  if (n === 0) return;

  // Canvas setup
  const width = 1000;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // Geometry
  const cx = width / 2;
  const cy = height / 2;

  // Inner radius provides a donut-like center; max bar length fills towards canvas edge
  const innerRadius = 120;
  const outerMargin = 40;
  const maxBarLength = Math.min(width, height) / 2 - innerRadius - outerMargin;

  // Angular spacing: constant bar width with a small angular gap
  const angleStep = (Math.PI * 2) / n;
  const gapAngle = Math.min(0.02, angleStep * 0.2); // small gap to separate bars

  // Scale radial length by the maximum count
  const maxCount = Math.max(...entries.map(([, c]) => c));

  // Render each radial bar
  for (let i = 0; i < n; i++) {
    const [word, count] = entries[i];
    const startAngle = -Math.PI / 2 + i * angleStep + gapAngle / 2;
    const endAngle = -Math.PI / 2 + (i + 1) * angleStep - gapAngle / 2;

    const barLen = maxCount > 0 ? (count / maxCount) * maxBarLength : 0;
    const outerRadius = innerRadius + barLen;

    // Draw the bar as a ring sector between innerRadius and outerRadius
    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius, startAngle, endAngle);
    ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = quartileColor(i, n);
    ctx.fill();

    // Optional outline for clarity
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Label: place just beyond the tip of each bar at the mid-angle
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = outerRadius + 10;
    const lx = cx + Math.cos(midAngle) * labelRadius;
    const ly = cy + Math.sin(midAngle) * labelRadius;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(midAngle);
    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    // Simple truncation to avoid overly long labels overlapping
    const maxChars = 14;
    const label = word.length > maxChars ? word.slice(0, maxChars - 2) + "…" : word;
    ctx.fillText(label, 0, 0);
    ctx.restore();
  }

  // Persist image
  const buffer = canvas.toBuffer("image/png");
  writeFileSync("word_count_chart_radial_bar.png", buffer);
}
