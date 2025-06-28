import { Logger } from '../core/logger';

describe('logger', () => {
  describe('log levels', () => {
    it('logs a message at the debug level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.debug('This is a debug message');
      expect(transport).toHaveBeenCalledWith('This is a debug message', 'debug');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the info level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.info('This is an info message');
      expect(transport).toHaveBeenCalledWith('This is an info message', 'info');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the notice level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.notice('This is a notice message');
      expect(transport).toHaveBeenCalledWith('This is a notice message', 'notice');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the warn level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.warn('This is a warn message');
      expect(transport).toHaveBeenCalledWith('This is a warn message', 'warn');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the error level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.error('This is an error message');
      expect(transport).toHaveBeenCalledWith('This is an error message', 'error');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the critical level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.critical('This is a critical message');
      expect(transport).toHaveBeenCalledWith('This is a critical message', 'crit');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the alert level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.alert('This is an alert message');
      expect(transport).toHaveBeenCalledWith('This is an alert message', 'alert');
      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('logs a message at the emergency level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'debug',
      });
      logger.emergency('This is an emergency message');
      expect(transport).toHaveBeenCalledWith('This is an emergency message', 'emerg');
      expect(transport).toHaveBeenCalledTimes(1);
    });
  });

  describe('filtering log levels', () => {
    describe('when the log level is set to debug', () => {
      it('should log all messages', () => {
        const transport = jest.fn();
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

        expect(transport).toHaveBeenCalledTimes(8);
      });
    });
  });

  describe('when the log level is set to info', () => {
    it('should log messages at info level and above', () => {
      const transport = jest.fn();
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

      expect(transport).toHaveBeenCalledTimes(7);
    });

    it('should not log debug messages', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'info',
      });
      logger.debug('Debug message');

      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to notice', () => {
    it('should log messages at notice level and above', () => {
      const transport = jest.fn();
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

      expect(transport).toHaveBeenCalledTimes(6);
    });

    it('should not log messages below notice level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'notice',
      });
      logger.debug('Debug message');
      logger.info('Info message');

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to warn', () => {
    it('should log messages at warn and above', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'warn',
      });
      logger.warn('Warn message');
      logger.error('Error message');
      logger.critical('Critical message');
      logger.alert('Alert message');
      logger.emergency('Emergency message');

      expect(transport).toHaveBeenCalledTimes(5);
    });

    it('should not log messages below warn level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'warn',
      });
      logger.debug('Debug message');
      logger.info('Info message');
      logger.notice('Notice message');

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).not.toHaveBeenCalledWith('Notice message', 'notice');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to error', () => {
    it('should log messages at error level and above', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'error',
      });
      logger.error('Error message');
      logger.critical('Critical message');
      logger.alert('Alert message');
      logger.emergency('Emergency message');

      expect(transport).toHaveBeenCalledTimes(4);
    });

    it('should not log messages below error level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'error',
      });
      logger.debug('Debug message');
      logger.info('Info message');
      logger.notice('Notice message');
      logger.warn('Warn message');

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).not.toHaveBeenCalledWith('Notice message', 'notice');
      expect(transport).not.toHaveBeenCalledWith('Warn message', 'warn');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to critical', () => {
    it('should log messages at critical level and above', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'crit',
      });
      logger.critical('Critical message');
      logger.alert('Alert message');
      logger.emergency('Emergency message');

      expect(transport).toHaveBeenCalledTimes(3);
    });

    it('should not log messages below critical level', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'crit',
      });
      logger.debug('Debug message');
      logger.info('Info message');
      logger.notice('Notice message');
      logger.warn('Warn message');
      logger.error('Error message');

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).not.toHaveBeenCalledWith('Notice message', 'notice');
      expect(transport).not.toHaveBeenCalledWith('Warn message', 'warn');
      expect(transport).not.toHaveBeenCalledWith('Error message', 'error');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to alert', () => {
    it('should log messages at alert level and above', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'alert',
      });
      logger.alert('Alert message');
      logger.emergency('Emergency message');

      expect(transport).toHaveBeenCalledTimes(2);
    });

    it('should not log messages below alert level', () => {
      const transport = jest.fn();
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

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).not.toHaveBeenCalledWith('Notice message', 'notice');
      expect(transport).not.toHaveBeenCalledWith('Warn message', 'warn');
      expect(transport).not.toHaveBeenCalledWith('Error message', 'error');
      expect(transport).not.toHaveBeenCalledWith('Critical message', 'crit');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the log level is set to emergency', () => {
    it('should log only emergency messages', () => {
      const transport = jest.fn();
      const logger = new Logger({
        transport,
        level: 'emerg',
      });
      logger.emergency('Emergency message');

      expect(transport).toHaveBeenCalledTimes(1);
    });

    it('should not log messages below emergency level', () => {
      const transport = jest.fn();
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

      expect(transport).not.toHaveBeenCalledWith('Debug message', 'debug');
      expect(transport).not.toHaveBeenCalledWith('Info message', 'info');
      expect(transport).not.toHaveBeenCalledWith('Notice message', 'notice');
      expect(transport).not.toHaveBeenCalledWith('Warn message', 'warn');
      expect(transport).not.toHaveBeenCalledWith('Error message', 'error');
      expect(transport).not.toHaveBeenCalledWith('Critical message', 'crit');
      expect(transport).not.toHaveBeenCalledWith('Alert message', 'alert');
      expect(transport).toHaveBeenCalledTimes(0);
    });
  });
});
