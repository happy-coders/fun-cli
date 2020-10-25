import { Input } from '../commands';
import { buildProject } from '../lib/project/builder/project.builder';
import { buildProjectQuestions } from '../lib/project/builder/questions.builder';
import { AbstractAction } from './abstract.action';

export class AddAction extends AbstractAction {
  public async handle(inputs: Input[]) {
    const projectAlias = this.getProjectAlias(inputs);

    const questions = buildProjectQuestions();

    try {
      const project = await buildProject(projectAlias, questions);
      console.log('Project', project);
    } catch (err) {
      console.log('err', err);
    }
  }

  private getProjectAlias(inputs: Input[]): string {
    const aliasInput: Input = inputs.find(
      (input) => input.name === 'alias',
    ) as Input;

    if (!aliasInput) {
      throw new Error('No alias found in command input');
    }
    return aliasInput.value as string;
  }
}
