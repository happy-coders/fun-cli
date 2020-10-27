import * as inquirer from 'inquirer';

import { createAction } from '../actions/action.factory';
import { Project } from '../project.entity';
import { BuildProjectQuestionCollection } from './questions.builder';

export async function buildProject(
  alias: string,
  path: string,
  questions: BuildProjectQuestionCollection,
): Promise<Project> {
  const answers = await inquirer.prompt(questions);

  const project = new Project(alias, path);
  answers.actions?.forEach((action) => {
    project.addAction(createAction(action));
  });

  return project;
}
