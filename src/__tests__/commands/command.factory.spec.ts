import {
  AddCommand,
  DeleteCommand,
  ListCommand,
  WithCommand,
} from '../../lib/commands';
import {
  createAddCommand,
  createDeleteCommand,
  createListCommand,
  createWithCommand,
} from '../../lib/commands/command.factory';

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

  describe('createDeleteCommand', () => {
    it('should return an instance of DeleteCommand', () => {
      const command = createDeleteCommand();

      expect(command).toBeInstanceOf(DeleteCommand);
    });
  });

  describe('createWithCommand', () => {
    const command = createWithCommand();

    expect(command).toBeInstanceOf(WithCommand);
  });
});
