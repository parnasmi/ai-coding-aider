import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

export function wordCountBarChart(wordCounts: Record<string, number>): void {
  const sortedWordCounts = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1]);

  const canvasWidth = 800;
  const canvasHeight = sortedWordCounts.length * 20 + 50;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';

  sortedWordCounts.forEach(([word, count], index) => {
    ctx.fillText(`${word}: ${count}`, 10, 30 + index * 20);
    ctx.fillRect(150, 20 + index * 20, count * 10, 15);
  });

  const buffer = canvas.toBuffer('image/png');
  writeFileSync('word_count_chart.png', buffer);
  console.log('Word count chart saved as word_count_chart.png');
}
