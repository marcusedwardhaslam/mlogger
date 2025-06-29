import type { LogLevel } from '../logger';

export interface Transport {
  log: (logLevel: LogLevel, message: string, metadata?: Record<PropertyKey, unknown>) => Promise<void>;
}
