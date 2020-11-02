import { WithAction } from '../actions';
import { AddAction } from '../actions/add.action';
import { ListAction } from '../actions/list.action';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { AddCommand } from './add.command';
import { ListCommand } from './list.command';
import { WithCommand } from './with.command';

export function createAddCommand(): AddCommand {
  const repository = createProjectRepository();

  return new AddCommand(new AddAction(repository));
}

export function createListCommand(): ListCommand {
  const repository = createProjectRepository();

  return new ListCommand(new ListAction(repository));
}

export function createWithCommand(): WithCommand {
  return new WithCommand(new WithAction());
}
