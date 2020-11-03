import { ProjectRepository } from '../core/project/persistence/repository';
import {
  ADD_PROJECT_HELP,
  EMPTY_PROJECTS,
  LIST_PROJECTS,
  PROJECT_DETAILS_HELP,
} from '../core/ui/messages';
import { AbstractAction } from './abstract.action';

export class ListAction extends AbstractAction {
  constructor(private repository: ProjectRepository) {
    super();
  }

  setup(this: AbstractAction): (...args: any[]) => void {
    return async () => {
      await this.handle([]);
    };
  }

  public async handle() {
    const projects = await this.repository.listAll();

    if (projects.length === 0) {
      console.info(EMPTY_PROJECTS);
      console.info(ADD_PROJECT_HELP);
      return;
    }

    console.info(LIST_PROJECTS(projects));
    console.info(PROJECT_DETAILS_HELP());
  }
}
