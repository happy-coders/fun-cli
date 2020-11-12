import { CommanderStatic } from 'commander';

import { AddAction } from '../../lib/actions';
import { AddCommand } from '../../lib/commands/add.command';

describe('Add command', () => {
  describe('load', () => {
    const program: CommanderStatic = {
      command: jest.fn().mockReturnThis(),
      allowUnknownOption: jest.fn().mockReturnThis(),
      description: jest.fn().mockReturnThis(),
      requiredOption: jest.fn().mockReturnThis(),
      usage: jest.fn().mockReturnThis(),
      action: jest.fn().mockReturnThis(),
    } as any;
    const action: AddAction = {
      setup: jest.fn().mockReturnValue(jest.fn()),
    } as any;

    beforeAll(() => {
      const command = new AddCommand(action);
      command.load(program);
    });

    it('should define the command', () => {
      expect(program.command).toHaveBeenCalledTimes(1);
      expect(program.command).toHaveBeenCalledWith('add <project-alias>');
    });

    it('should not allow unknown options', () => {
      expect(program.allowUnknownOption).toHaveBeenCalledTimes(1);
      expect(program.allowUnknownOption).toHaveBeenCalledWith(false);
    });

    it('should define the description', () => {
      expect(program.description).toHaveBeenCalledTimes(1);
      expect(program.description).toHaveBeenCalledWith('Adds fun project.');
    });

    it('should define the path option as required', () => {
      expect(program.requiredOption).toHaveBeenCalledTimes(1);
      expect(program.requiredOption).toHaveBeenCalledWith(
        '-p, --path <path>',
        'The absolute path to your fun project.',
      );
    });

    it('should define the usage info', () => {
      expect(program.usage).toHaveBeenCalledTimes(1);
      expect(program.usage).toHaveBeenCalledWith('<project-alias> [options]');
    });

    it('should define the action calling AddAction setup', () => {
      expect(program.action).toHaveBeenCalledTimes(1);
      expect(program.action).toHaveBeenCalledWith(action.setup());
    });
  });
});
