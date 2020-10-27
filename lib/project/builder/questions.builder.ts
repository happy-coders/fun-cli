import { QuestionCollection } from 'inquirer';

import { ActionName } from '../actions/abstract.action';

export interface BuildProjectAnswers {
  actions: ActionName[];
}

export type BuildProjectQuestionCollection = QuestionCollection<
  BuildProjectAnswers
>;

export function buildProjectQuestions(): BuildProjectQuestionCollection {
  return [
    {
      type: 'checkbox',
      name: 'actions',
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
