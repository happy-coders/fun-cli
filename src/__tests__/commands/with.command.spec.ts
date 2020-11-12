import { CommanderStatic } from 'commander';

import { WithAction } from '../../lib/actions';
import { WithCommand } from '../../lib/commands/with.command';

describe('With command', () => {
  describe('load', () => {
    const program: CommanderStatic = {
      command: jest.fn().mockReturnThis(),
      allowUnknownOption: jest.fn().mockReturnThis(),
      description: jest.fn().mockReturnThis(),
      requiredOption: jest.fn().mockReturnThis(),
      usage: jest.fn().mockReturnThis(),
      action: jest.fn().mockReturnThis(),
    } as any;
    const action: WithAction = {
      setup: jest.fn().mockReturnValue(jest.fn()),
    } as any;

    beforeAll(() => {
      const command = new WithCommand(action);
      command.load(program);
    });

    it('should define the command', () => {
      expect(program.command).toHaveBeenCalledTimes(1);
      expect(program.command).toHaveBeenCalledWith('with <project-alias>');
    });

    it('should not allow unknown options', () => {
      expect(program.allowUnknownOption).toHaveBeenCalledTimes(1);
      expect(program.allowUnknownOption).toHaveBeenCalledWith(false);
    });

    it('should define the description', () => {
      expect(program.description).toHaveBeenCalledTimes(1);
      expect(program.description).toHaveBeenCalledWith('Runs a fun project.');
    });

    it('should define the usage info', () => {
      expect(program.usage).toHaveBeenCalledTimes(1);
      expect(program.usage).toHaveBeenCalledWith('<project-alias>');
    });

    it('should define the action calling WithAction setup', () => {
      expect(program.action).toHaveBeenCalledTimes(1);
      expect(program.action).toHaveBeenCalledWith(action.setup());
    });
  });
});
