import chalk from 'chalk';
import { CommanderStatic } from 'commander';

import {
  AddCommand,
  CommandLoader,
  DeleteCommand,
  ListCommand,
  WithCommand,
} from '../../commands';
import * as commandsFactory from '../../commands/command.factory';
import { ERROR_PREFIX } from '../../core/ui';

jest.mock('../../commands/command.factory');

const createAddCommand = commandsFactory.createAddCommand as jest.MockedFunction<
  typeof commandsFactory.createAddCommand
>;
const createWithCommand = commandsFactory.createWithCommand as jest.MockedFunction<
  typeof commandsFactory.createWithCommand
>;
const createListCommand = commandsFactory.createListCommand as jest.MockedFunction<
  typeof commandsFactory.createListCommand
>;
const createDeleteCommand = commandsFactory.createDeleteCommand as jest.MockedFunction<
  typeof commandsFactory.createDeleteCommand
>;

describe('Command loader', () => {
  const addCommand: AddCommand = {
    load: jest.fn(),
  } as any;

  const withCommand: WithCommand = {
    load: jest.fn(),
  } as any;

  const listCommand: ListCommand = {
    load: jest.fn(),
  } as any;

  const deleteCommand: DeleteCommand = {
    load: jest.fn(),
  } as any;

  const program: CommanderStatic = {
    on: jest.fn(),
    args: ['a', 'b'],
  } as any;

  describe('Invalid command handler', () => {
    beforeAll(() => {
      global.console.error = jest.fn();
      global.console.info = jest.fn();
      global.process.exit = jest.fn() as any;

      const handler = CommandLoader.invalidCommandHandler(program);

      handler();
    });

    it('should print error message', () => {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('a b')}`,
      );
    });

    it('should print help command hint', () => {
      expect(console.info).toHaveBeenCalledTimes(1);
      expect(console.info).toHaveBeenCalledWith(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
    });

    it('should exit the process with code 1', () => {
      expect(process.exit).toHaveBeenCalledTimes(1);
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('load', () => {
    beforeAll(() => {
      createAddCommand.mockReturnValue(addCommand);
      createWithCommand.mockReturnValue(withCommand);
      createListCommand.mockReturnValue(listCommand);
      createDeleteCommand.mockReturnValue(deleteCommand);

      CommandLoader.invalidCommandHandler = jest
        .fn()
        .mockReturnValue(jest.fn());
      CommandLoader.load(program);
    });

    it('should load AddCommand', () => {
      expect(addCommand.load).toHaveBeenCalledTimes(1);
      expect(addCommand.load).toHaveBeenCalledWith(program);
    });

    it('should load WithCommand', () => {
      expect(withCommand.load).toHaveBeenCalledTimes(1);
      expect(withCommand.load).toHaveBeenCalledWith(program);
    });

    it('should load ListCommand', () => {
      expect(listCommand.load).toHaveBeenCalledTimes(1);
      expect(listCommand.load).toHaveBeenCalledWith(program);
    });

    it('should load DeleteCommand', () => {
      expect(deleteCommand.load).toHaveBeenCalledTimes(1);
      expect(deleteCommand.load).toHaveBeenCalledWith(program);
    });

    it('should register listener for invalid commands', () => {
      expect(program.on).toHaveBeenCalledTimes(1);
      expect(program.on).toHaveBeenCalledWith(
        'command:*',
        CommandLoader.invalidCommandHandler(program),
      );
    });
  });
});
