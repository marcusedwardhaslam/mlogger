import { ConsoleTransport } from '../../core/transports/console';

describe('console transport', () => {
  const date = new Date('2025-06-29T15:23:00Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(date);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should log the message using console.log', async () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

    const transport = new ConsoleTransport({
      level: 'info',
    });
    await transport.log('info', 'Test message');

    expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] info: Test message`);
    consoleSpy.mockRestore();
  });

  it('should include metadata if provided', async () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

    const transport = new ConsoleTransport({
      level: 'info',
    });
    const metadata = { key: 'value' };
    await transport.log('info', 'Test message', metadata);

    expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] info: Test message`, metadata);
    consoleSpy.mockRestore();
  });

  describe('ConsoleTransport log level routing', () => {
    it('should log emerg messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('emerg', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] emerg: This is a message`);
    });

    it('should log alert messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('alert', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] alert: This is a message`);
    });

    it('should log crit messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('crit', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] crit: This is a message`);
    });

    it('should log error messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('error', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] error: This is a message`);
    });

    it('should log warn messages', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('warn', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] warn: This is a message`);
    });

    it('should log notice messages', async () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('notice', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] notice: This is a message`);
    });

    it('should log info messages', async () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('info', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] info: This is a message`);
    });

    it('should log debug messages', async () => {
      const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
      const transport = new ConsoleTransport({ level: 'debug' });
      await transport.log('debug', 'This is a message');
      expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] debug: This is a message`);
    });
  });
});
