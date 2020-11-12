import { CommanderStatic } from 'commander';

import { ListAction } from '../../lib/actions/list.action';
import { ListCommand } from '../../lib/commands/list.command';

describe('List command', () => {
  describe('load', () => {
    const program: CommanderStatic = {
      command: jest.fn().mockReturnThis(),
      allowUnknownOption: jest.fn().mockReturnThis(),
      description: jest.fn().mockReturnThis(),
      action: jest.fn().mockReturnThis(),
    } as any;
    const action: ListAction = {
      setup: jest.fn().mockReturnValue(jest.fn()),
    } as any;

    beforeAll(() => {
      const command = new ListCommand(action);
      command.load(program);
    });

    it('should define the command', () => {
      expect(program.command).toHaveBeenCalledTimes(1);
      expect(program.command).toHaveBeenCalledWith('list');
    });

    it('should not allow unknown options', () => {
      expect(program.allowUnknownOption).toHaveBeenCalledTimes(1);
      expect(program.allowUnknownOption).toHaveBeenCalledWith(false);
    });

    it('should define the description', () => {
      expect(program.description).toHaveBeenCalledTimes(1);
      expect(program.description).toHaveBeenCalledWith('Lists fun projects.');
    });

    it('should define the action calling ListAction setup', () => {
      expect(program.action).toHaveBeenCalledTimes(1);
      expect(program.action).toHaveBeenCalledWith(action.setup());
    });
  });
});
