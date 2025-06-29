import type { LogLevel } from '../logger';

interface FileSystemTransportOptions {
  filePath: string;
  writer: {
    append: (filePath: string, content: string) => Promise<void>;
  };
}

export class FileSystemTransport {
  constructor(private options: FileSystemTransportOptions) {}

  async log(level: LogLevel, message: string, metadata?: Record<PropertyKey, unknown>): Promise<void> {
    const logEntry: Record<PropertyKey, unknown> = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    if (metadata !== undefined) {
      logEntry.metadata = metadata;
    }

    await this.options.writer.append(this.options.filePath, `${JSON.stringify(logEntry)}\n`);
  }
}
