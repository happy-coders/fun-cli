import { AddCommand } from '../../commands/add.command';
import {
  createAddCommand,
  createListCommand,
  createWithCommand,
} from '../../commands/command.factory';
import { ListCommand } from '../../commands/list.command';
import { WithCommand } from '../../commands/with.command';

describe('Command factory', () => {
  describe('createAddCommand', () => {
    it('should return an instance of AddCommand', () => {
      const command = createAddCommand();

      expect(command).toBeInstanceOf(AddCommand);
    });
  });

  describe('createListCommand', () => {
    it('should return an instance of ListCommand', () => {
      const command = createListCommand();

      expect(command).toBeInstanceOf(ListCommand);
    });
  });

  describe('createWithCommand', () => {
    const command = createWithCommand();

    expect(command).toBeInstanceOf(WithCommand);
  });
});
