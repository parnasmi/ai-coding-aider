export function getTranscriptFilePath(defaultPath: string = "./transcript.txt"): string {
  const args = process.argv.slice(2);
  return args[0] ? parseInt(args[0], 10) : defaultThreshold;
}

export function getMinCountThreshold(defaultThreshold: number = 3): number {
  const args = process.argv.slice(2);
  return args[0] || defaultPath;
}
