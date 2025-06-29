import type { LogLevel } from '../logger';

import { Transport } from './transport';

interface ConsoleTransportOptions {
  level: LogLevel;
}

export class ConsoleTransport implements Transport {
  constructor(private options: ConsoleTransportOptions) {}

  log(level: LogLevel, message: string, metadata?: Record<PropertyKey, unknown>): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}`;

    const args = metadata !== undefined ? [logEntry, metadata] : [logEntry];

    switch (level) {
      case 'emerg':
      case 'alert':
      case 'crit':
      case 'error':
        console.error(...args);
        break;
      case 'warn':
        console.warn(...args);
        break;
      case 'notice':
      case 'info':
        console.info(...args);
        break;
      case 'debug':
        console.debug(...args);
        break;
    }

    return Promise.resolve();
  }
}
