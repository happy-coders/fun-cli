import { AddCommand } from '../../src/commands/add.command';
import {
  createAddCommand,
  createWithCommand,
} from '../../src/commands/command.factory';
import { WithCommand } from '../../src/commands/with.command';

describe('Command factory', () => {
  describe('createAddCommand', () => {
    it('should return an instance of AddCommand', () => {
      const command = createAddCommand();

      expect(command).toBeInstanceOf(AddCommand);
    });
  });

  describe('createWithCommand', () => {
    const command = createWithCommand();

    expect(command).toBeInstanceOf(WithCommand);
  });
});
