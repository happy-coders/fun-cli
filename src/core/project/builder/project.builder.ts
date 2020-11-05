import * as inquirer from 'inquirer';

import { Project } from '../project.entity';
import { createTask } from '../tasks/task.factory';
import { buildProjectQuestions } from './questions.builder';

export async function buildProject(
  alias: string,
  path: string,
): Promise<Project> {
  const questions = buildProjectQuestions();

  const answers = await inquirer.prompt(questions);

  const project = new Project(alias, path);
  answers.tasks.forEach((action) => {
    project.addTask(createTask(action));
  });

  return project;
}
