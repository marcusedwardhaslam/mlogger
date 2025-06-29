import { FileSystemTransport } from '../../core/transports/fileSystem';

describe('filesystem transport', () => {
  describe('when the transport is called', () => {
    it('should write the message to a file', async () => {
      const writer = { append: jest.fn() };
      const filePath = 'test-log.txt';
      const message = 'Test log message';
      const transport = new FileSystemTransport({
        writer,
        filePath,
      });

      await transport.log('info', message);

      expect(writer.append).toHaveBeenCalledWith(filePath, expect.stringContaining(`"message":"${message}"`));
    });

    it('should include the level in the log message', async () => {
      const writer = { append: jest.fn() };
      const filePath = 'test-log.txt';
      const level = 'info';
      const transport = new FileSystemTransport({
        writer,
        filePath,
      });

      await transport.log(level, 'log me please');

      expect(writer.append).toHaveBeenCalledWith(filePath, expect.stringContaining(`"level":"${level}"`));
    });

    it('should include the metadata in the log message', async () => {
      const writer = { append: jest.fn() };
      const filePath = 'test-log.txt';
      const metadata = { user: 'testUser' };
      const transport = new FileSystemTransport({
        writer,
        filePath,
      });
      await transport.log('info', 'log with metadata', metadata);
      expect(writer.append).toHaveBeenCalledWith(
        filePath,
        expect.stringContaining(`"metadata":${JSON.stringify(metadata)}`),
      );
    });

    it('should omit metadata if not provided', async () => {
      const writer = { append: jest.fn() };
      const filePath = 'test-log.txt';
      const transport = new FileSystemTransport({
        writer,
        filePath,
      });

      await transport.log('info', 'log without metadata');

      expect(writer.append).toHaveBeenCalledWith(filePath, expect.not.stringContaining('"metadata"'));
    });
  });
});
