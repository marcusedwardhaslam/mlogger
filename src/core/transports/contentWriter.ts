export interface ContentWriter {
  append: (filePath: string, content: string) => Promise<void>;
}
