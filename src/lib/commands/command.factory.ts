import { AddAction, DeleteAction, ListAction, WithAction } from '../actions';
import { createProjectRepository } from '../core/project/persistence/repository.factory';
import { AddCommand, DeleteCommand, ListCommand, WithCommand } from './';

export function createAddCommand(): AddCommand {
  const repository = createProjectRepository();

  return new AddCommand(new AddAction(repository));
}

export function createListCommand(): ListCommand {
  const repository = createProjectRepository();

  return new ListCommand(new ListAction(repository));
}

export function createDeleteCommand(): ListCommand {
  const repository = createProjectRepository();

  return new DeleteCommand(new DeleteAction(repository));
}

export function createWithCommand(): WithCommand {
  return new WithCommand(new WithAction());
}
