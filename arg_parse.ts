export function getTranscriptFilePath(
  defaultPath: string = "./transcript.txt"
): string {
  const args = process.argv.slice(2);
  return args[0] || defaultPath;
}

export function getOutputFormat(defaultFormat: string = "text"): string {
  const args = process.argv.slice(2);
  return args[2] || defaultFormat;
}

export function getMinCountThreshold(defaultThreshold: number = 3): number {
  const args = process.argv.slice(2);
  return args[1] ? parseInt(args[1], 10) : defaultThreshold;
}
