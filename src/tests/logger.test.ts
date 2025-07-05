import { Logger } from '../core/logger';

describe('logger', () => {
  describe('log levels', () => {
    it('logs a message at the debug level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.debug('This is a debug message');
      expect(transport.log).toHaveBeenCalledWith('debug', 'This is a debug message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the info level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.info('This is an info message');
      expect(transport.log).toHaveBeenCalledWith('info', 'This is an info message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the notice level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.notice('This is a notice message');
      expect(transport.log).toHaveBeenCalledWith('notice', 'This is a notice message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the warn level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.warn('This is a warn message');
      expect(transport.log).toHaveBeenCalledWith('warn', 'This is a warn message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the error level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.error('This is an error message');
      expect(transport.log).toHaveBeenCalledWith('error', 'This is an error message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the critical level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.critical('This is a critical message');
      expect(transport.log).toHaveBeenCalledWith('crit', 'This is a critical message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the alert level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.alert('This is an alert message');
      expect(transport.log).toHaveBeenCalledWith('alert', 'This is an alert message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the emergency level', () => {
      const transport = {
        log: jest.fn(),
      };
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.emergency('This is an emergency message');
      expect(transport.log).toHaveBeenCalledWith('emerg', 'This is an emergency message', undefined);
      expect(transport.log).toHaveBeenCalledTimes(1);
    });
  });

  describe('filtering log levels', () => {
    describe('when the log level is set to debug', () => {
      it('should log all messages', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'debug',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(8);
      });
    });

    describe('when the log level is set to info', () => {
      it('should log messages at info level and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'info',
        });
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(7);
      });

      it('should not log debug messages', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'info',
        });
        logger.debug('Debug message');

        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to notice', () => {
      it('should log messages at notice level and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'notice',
        });
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(6);
      });

      it('should not log messages below notice level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'notice',
        });
        logger.debug('Debug message');
        logger.info('Info message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to warn', () => {
      it('should log messages at warn and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'warn',
        });
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(5);
      });

      it('should not log messages below warn level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'warn',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).not.toHaveBeenCalledWith('Notice message', 'notice');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to error', () => {
      it('should log messages at error level and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'error',
        });
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(4);
      });

      it('should not log messages below error level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'error',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).not.toHaveBeenCalledWith('Notice message', 'notice');
        expect(transport.log).not.toHaveBeenCalledWith('Warn message', 'warn');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to critical', () => {
      it('should log messages at critical level and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'crit',
        });
        logger.critical('Critical message');
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(3);
      });

      it('should not log messages below critical level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'crit',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).not.toHaveBeenCalledWith('Notice message', 'notice');
        expect(transport.log).not.toHaveBeenCalledWith('Warn message', 'warn');
        expect(transport.log).not.toHaveBeenCalledWith('Error message', 'error');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to alert', () => {
      it('should log messages at alert level and above', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'alert',
        });
        logger.alert('Alert message');
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(2);
      });

      it('should not log messages below alert level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'alert',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).not.toHaveBeenCalledWith('Notice message', 'notice');
        expect(transport.log).not.toHaveBeenCalledWith('Warn message', 'warn');
        expect(transport.log).not.toHaveBeenCalledWith('Error message', 'error');
        expect(transport.log).not.toHaveBeenCalledWith('Critical message', 'crit');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the log level is set to emergency', () => {
      it('should log only emergency messages', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'emerg',
        });
        logger.emergency('Emergency message');

        expect(transport.log).toHaveBeenCalledTimes(1);
      });

      it('should not log messages below emergency level', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'emerg',
        });
        logger.debug('Debug message');
        logger.info('Info message');
        logger.notice('Notice message');
        logger.warn('Warn message');
        logger.error('Error message');
        logger.critical('Critical message');
        logger.alert('Alert message');

        expect(transport.log).not.toHaveBeenCalledWith('Debug message', 'debug');
        expect(transport.log).not.toHaveBeenCalledWith('Info message', 'info');
        expect(transport.log).not.toHaveBeenCalledWith('Notice message', 'notice');
        expect(transport.log).not.toHaveBeenCalledWith('Warn message', 'warn');
        expect(transport.log).not.toHaveBeenCalledWith('Error message', 'error');
        expect(transport.log).not.toHaveBeenCalledWith('Critical message', 'crit');
        expect(transport.log).not.toHaveBeenCalledWith('Alert message', 'alert');
        expect(transport.log).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('handling extra metadata', () => {
    describe('when including metadata in the logger call', () => {
      it('passes the metadata to the transport', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'debug',
        });
        const metadata = { userId: 123, action: 'login' };
        logger.debug('User logged in', metadata);
        expect(transport.log).toHaveBeenCalledTimes(1);
        expect(transport.log).toHaveBeenCalledWith('debug', 'User logged in', metadata);
      });
    });

    describe('when metadata is not provided', () => {
      it('should not pass the metadata to the transport', () => {
        const transport = {
          log: jest.fn(),
        };
        const logger = new Logger({
          transport,
          level: 'debug',
        });
        logger.debug('User logged in');
        expect(transport.log).toHaveBeenCalledTimes(1);
        const [, , extra] = transport.log.mock.calls[0];
        expect(extra).toBeUndefined();
        expect(transport.log).toHaveBeenCalledWith('debug', 'User logged in', undefined);
      });
    });
  });
});
