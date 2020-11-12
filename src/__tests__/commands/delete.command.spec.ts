import { CommanderStatic } from 'commander';

import { DeleteAction } from '../../lib/actions';
import { DeleteCommand } from '../../lib/commands';

describe('Delete command', () => {
  describe('load', () => {
    const program: CommanderStatic = {
      command: jest.fn().mockReturnThis(),
      allowUnknownOption: jest.fn().mockReturnThis(),
      description: jest.fn().mockReturnThis(),
      requiredOption: jest.fn().mockReturnThis(),
      usage: jest.fn().mockReturnThis(),
      action: jest.fn().mockReturnThis(),
    } as any;
    const action: DeleteAction = {
      setup: jest.fn().mockReturnValue(jest.fn()),
    } as any;

    beforeAll(() => {
      const command = new DeleteCommand(action);
      command.load(program);
    });

    it('should define the command', () => {
      expect(program.command).toHaveBeenCalledTimes(1);
      expect(program.command).toHaveBeenCalledWith('delete <project-alias>');
    });

    it('should not allow unknown options', () => {
      expect(program.allowUnknownOption).toHaveBeenCalledTimes(1);
      expect(program.allowUnknownOption).toHaveBeenCalledWith(false);
    });

    it('should define the description', () => {
      expect(program.description).toHaveBeenCalledTimes(1);
      expect(program.description).toHaveBeenCalledWith(
        'Removes a probable not fun project.',
      );
    });

    it('should define the usage info', () => {
      expect(program.usage).toHaveBeenCalledTimes(1);
      expect(program.usage).toHaveBeenCalledWith('<project-alias>');
    });

    it('should define the action calling DeleteAction setup', () => {
      expect(program.action).toHaveBeenCalledTimes(1);
      expect(program.action).toHaveBeenCalledWith(action.setup());
    });
  });
});
