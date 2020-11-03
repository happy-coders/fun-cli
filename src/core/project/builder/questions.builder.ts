import { QuestionCollection } from 'inquirer';

import { TaskName } from '../tasks/abstract.task';

export interface BuildProjectAnswers {
  tasks: TaskName[];
}

export type BuildProjectQuestionCollection = QuestionCollection<
  BuildProjectAnswers
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
