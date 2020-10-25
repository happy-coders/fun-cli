import * as inquirer from 'inquirer';

import { Project } from '../project.entity';
import {
  buildMoreSubprojectQuestion,
  BuildProjectQuestionCollection,
  buildProjectQuestions,
} from './questions.builder';

async function buildSubproject(parent: Project) {
  const subprojectQuestion = buildProjectQuestions(parent);
  const subproject = await buildProject(parent.getAlias(), subprojectQuestion);

  parent.addSubproject(subproject);

  const { haveMoreSubprojects } = await inquirer.prompt(
    buildMoreSubprojectQuestion(parent),
  );

  if (haveMoreSubprojects) {
    await buildSubproject(parent);
  }
}

export async function buildProject(
  alias: string,
  questions: BuildProjectQuestionCollection,
): Promise<Project> {
  const answers = await inquirer.prompt(questions);

  const project = Project.createFromAnswers(alias, answers);

  if (answers.hasSubprojects) {
    await buildSubproject(project);
  }

  return project;
}
