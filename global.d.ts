declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const filePath: string;
  export default filePath;
}

declare module '*.png' {
  const filePath: string;
  export default filePath;
}

declare module '*.svg' {
  const filePath: string;
  export default filePath;
}

declare module '*.mp3' {
  const filePath: string;
  export default filePath;
}

declare module '*.csv' {
  const filePath: string;
  export default filePath;
}
