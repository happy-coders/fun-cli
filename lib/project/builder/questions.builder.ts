import { QuestionCollection } from 'inquirer';

import { ActionName } from '../actions/abstract.action';
import { Project } from '../project.entity';

export interface BuildProjectAnswers {
  path: string;
  hasSubprojects: boolean;
  hasMoreSubprojects?: boolean;
  actions: ActionName[];
}

export type BuildProjectQuestionCollection = QuestionCollection<
  BuildProjectAnswers
>;

export function buildProjectQuestions(
  parent?: Project,
): BuildProjectQuestionCollection {
  const answersTarget = parent ? 'subproject' : 'project';

  return [
    {
      type: 'input',
      name: 'path',
      message: `Where is your ${answersTarget} folder?`,
    },
    {
      type: 'confirm',
      name: 'hasSubprojects',
      message: `Does your ${answersTarget} have subprojects?`,
    },
    {
      type: 'checkbox',
      name: 'actions',
      message: `What will happen when this ${answersTarget} opens?`,
      when: (answers) => !answers.hasSubprojects,
      choices: [
        {
          name: 'Open VSCode',
          value: 'open-vscode',
        },
      ],
    },
  ];
}

export interface MoreSubprojectAnswers {
  haveMoreSubprojects: boolean;
}

export type BuildMoreSubprojectCollection = QuestionCollection<
  MoreSubprojectAnswers
>;

export function buildMoreSubprojectQuestion(
  parent: Project,
): BuildMoreSubprojectCollection {
  return [
    {
      type: 'confirm',
      name: 'haveMoreSubprojects',
      message: `Have more subprojects for ${parent.getAlias()}?`,
    },
  ];
}
