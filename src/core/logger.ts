type LogLevel = 'emerg' | 'alert' | 'crit' | 'error' | 'warn' | 'notice' | 'info' | 'debug';

interface LoggerOptions {
  transport: (message: string, level: LogLevel) => void;
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

  private log(message: string, level: LogLevel): void {
    const currentLevelIndex = Logger.LEVEL_RANKS[this.options.level];
    const messageLevelIndex = Logger.LEVEL_RANKS[level];
    if (messageLevelIndex > currentLevelIndex) return;

    this.options.transport(message, level);
  }

  public debug(message: string): void {
    this.log(message, 'debug');
  }

  public info(message: string): void {
    this.log(message, 'info');
  }

  public notice(message: string): void {
    this.log(message, 'notice');
  }

  public warn(message: string): void {
    this.log(message, 'warn');
  }

  public error(message: string): void {
    this.log(message, 'error');
  }

  public critical(message: string): void {
    this.log(message, 'crit');
  }

  public alert(message: string): void {
    this.log(message, 'alert');
  }

  public emergency(message: string): void {
    this.log(message, 'emerg');
  }
}
