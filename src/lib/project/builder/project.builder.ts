import * as inquirer from 'inquirer';

import { Project } from '../project.entity';
import { createTask } from '../tasks/task.factory';
import { BuildProjectQuestionCollection } from './questions.builder';

export async function buildProject(
  alias: string,
  path: string,
  questions: BuildProjectQuestionCollection,
): Promise<Project> {
  const answers = await inquirer.prompt(questions);

  const project = new Project(alias, path);
  answers.tasks.forEach((action) => {
    project.addTask(createTask(action));
  });

  return project;
}
