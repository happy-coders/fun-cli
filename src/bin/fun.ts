#!/usr/bin/env node
import commander from 'commander';
import { CommanderStatic } from 'commander';
import { CommandLoader } from '../commands';

const bootstrap = async () => {
  const program: CommanderStatic = commander;
  program
    .version(
      require('../../package.json').version,
      '-v, --version',
      'Output the current version.',
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information.');

  await CommandLoader.load(program);
  commander.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
