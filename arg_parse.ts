export function getTranscriptFilePath(defaultPath: string = "./transcript.txt"): string {
  const args = process.argv.slice(2);
  return args[0] || defaultPath;
}
