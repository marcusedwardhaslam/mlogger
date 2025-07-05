import { Logger } from './core/logger';
import { ConsoleTransport } from './core/transports/console';

const logger = new Logger({
  level: 'warn',
  transport: new ConsoleTransport(),
});

logger.debug('This is a debug message');
logger.emergency('This is an emergency message', { additional: 'Context of the error' });
