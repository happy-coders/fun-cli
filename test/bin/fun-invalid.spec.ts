import commander from 'commander';

import { testBootstrap } from './fun.asserts';

jest.mock('./../../src/commands/command.loader');
jest.mock('commander', () => ({
  version: jest.fn().mockReturnThis(),
  usage: jest.fn().mockReturnThis(),
  helpOption: jest.fn().mockReturnThis(),
  outputHelp: jest.fn(),
  parse: jest.fn(),
}));

const program = commander;

describe('When has no one arg passed to command', () => {
  beforeAll(() => {
    global.process.argv = ['fun'];
    require('../../src/bin/fun');
  });

  testBootstrap(program);

  it('should output help', () => {
    expect(program.outputHelp).toHaveBeenCalled();
  });
});
