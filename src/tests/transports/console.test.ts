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

    const transport = new ConsoleTransport();
    await transport.log('info', 'Test message');

    expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] info: Test message`);
    consoleSpy.mockRestore();
  });

  it('should include metadata if provided', async () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

    const transport = new ConsoleTransport();
    const metadata = { key: 'value' };
    await transport.log('info', 'Test message', metadata);

    expect(consoleSpy).toHaveBeenCalledWith(`[${date.toISOString()}] info: Test message`, metadata);
    consoleSpy.mockRestore();
  });
});
