import commander from 'commander';

import { testBootstrap } from './fun.asserts';

jest.mock('./../../commands/command.loader');
jest.mock('commander', () => ({
  version: jest.fn().mockReturnThis(),
  usage: jest.fn().mockReturnThis(),
  helpOption: jest.fn().mockReturnThis(),
  outputHelp: jest.fn(),
  parse: jest.fn(),
}));

const program = commander;

describe('Fun binary', () => {
  describe('When has correct args passed', () => {
    beforeAll(() => {
      global.process.argv = ['fun', 'add', 'funny'];
      require('../../bin/fun');
    });

    testBootstrap(program);

    it('should not output help', () => {
      expect(program.outputHelp).not.toHaveBeenCalled();
    });
  });
});
