import commander, { CommanderStatic } from 'commander';

export const testBootstrap = (program: CommanderStatic) => {
  it('should define the version', () => {
    expect(program.version).toHaveBeenCalledTimes(1);
    expect(program.version).toHaveBeenCalledWith(
      require('../../package.json').version,
      '-v, --version',
      'Output the current version.',
    );
  });

  it('should define the usage', () => {
    expect(program.usage).toHaveBeenCalledTimes(1);
    expect(program.usage).toHaveBeenCalledWith('<command> [options]');
  });

  it('should define the help option', () => {
    expect(program.helpOption).toHaveBeenCalledTimes(1);
    expect(program.helpOption).toHaveBeenCalledWith(
      '-h, --help',
      'Output usage information.',
    );
  });

  it('should parse args', () => {
    expect(program.parse).toHaveBeenCalledTimes(1);
    expect(commander.parse).toHaveBeenCalledWith(process.argv);
  });
};
