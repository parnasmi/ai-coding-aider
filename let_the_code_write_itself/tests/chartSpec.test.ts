import { createRadialBarChart, createBubbleChart } from "../chartSpec";
import { WordCounts } from "../dataTypesSpec";

describe("createRadialBarChart", () => {
  it("should create a radial bar chart image", () => {
    const wordCounts: WordCounts = {
      countToWordMap: {
        word1: 5,
        word2: 3,
      },
    };

    createRadialBarChart(wordCounts);
    // Add assertions to check if the file is created and has content
  });
});

describe("createBubbleChart", () => {
  it("should create a bubble chart image", () => {
    const wordCounts: WordCounts = {
      countToWordMap: {
        word1: 5,
        word2: 3,
      },
    };

    createBubbleChart(wordCounts);
    // Add assertions to check if the file is created and has content
  });
});
