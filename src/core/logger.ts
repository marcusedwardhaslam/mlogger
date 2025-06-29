type LogLevel = 'emerg' | 'alert' | 'crit' | 'error' | 'warn' | 'notice' | 'info' | 'debug';

interface LoggerOptions {
  transport: (level: LogLevel, message: string, metadata?: Record<PropertyKey, unknown>) => void;
  level: LogLevel;
}

export class Logger {
  static readonly LEVEL_RANKS: Record<LogLevel, number> = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };

  constructor(private options: LoggerOptions) {}

  private log(level: LogLevel, message: string, extra?: Record<PropertyKey, unknown>): void {
    const currentLevelIndex = Logger.LEVEL_RANKS[this.options.level];
    const messageLevelIndex = Logger.LEVEL_RANKS[level];
    if (messageLevelIndex > currentLevelIndex) return;
    this.options.transport(level, message, extra);
  }

  public debug(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('debug', message, extra);
  }

  public info(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('info', message, extra);
  }

  public notice(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('notice', message, extra);
  }

  public warn(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('warn', message, extra);
  }

  public error(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('error', message, extra);
  }

  public critical(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('crit', message, extra);
  }

  public alert(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('alert', message, extra);
  }

  public emergency(message: string, extra?: Record<PropertyKey, unknown>): void {
    this.log('emerg', message, extra);
  }
}
