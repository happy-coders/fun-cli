import chalk from 'chalk';
import { QuestionCollection } from 'inquirer';

import { Project } from '../project.entity';
import { TaskName } from '../tasks/abstract.task';

export interface BuildProjectAnswers {
  tasks: TaskName[];
}

export type BuildProjectQuestionCollection = QuestionCollection<
  BuildProjectAnswers
>;

interface BuildDeleteProjectConfirmation {
  shouldDelete: boolean;
}

export type BuildDeleteProjectConfirmationQuestionCollection = QuestionCollection<
  BuildDeleteProjectConfirmation
>;

export function buildProjectQuestions(): BuildProjectQuestionCollection {
  return [
    {
      type: 'checkbox',
      name: 'tasks',
      message: 'What will happen when the project opens?',
      choices: [
        {
          name: 'Open VSCode',
          value: 'open-vscode',
          checked: true,
        },
      ],
    },
  ];
}

export function buildDeleteProjectConfirmationQuestion(
  project: Project,
): BuildDeleteProjectConfirmationQuestionCollection {
  return [
    {
      type: 'confirm',
      name: 'shouldDelete',
      message: `Are you sure you want to delete "${chalk.yellow(
        project.getAlias(),
      )}"`,
      default: true,
    },
  ];
}
