import * as inquirer from 'inquirer';

import { createTask } from '../tasks/task.factory';
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
    project.addTask(createTask(action));
  });

  return project;
}
