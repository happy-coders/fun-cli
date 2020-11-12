import chalk from 'chalk';
import { CheckboxQuestion, ConfirmQuestion } from 'inquirer';

import {
  buildDeleteProjectConfirmationQuestion,
  buildProjectQuestions,
} from '../../../../lib/core/project/builder/questions.builder';
import { Project } from '../../../../lib/core/project/project.entity';

describe('Build questions', () => {
  describe('For project', () => {
    let questions: any[];
    beforeAll(() => {
      questions = buildProjectQuestions() as any;
    });

    describe('Tasks question', () => {
      let tasksQuestion: CheckboxQuestion;
      beforeAll(() => {
        tasksQuestion = questions[0];
      });

      it('should be correct definitions', () => {
        expect(tasksQuestion.message).toBe(
          'What will happen when the project opens?',
        );
        expect(tasksQuestion.name).toBe('tasks');
        expect(tasksQuestion.type).toBe('checkbox');
        expect(tasksQuestion.choices).toStrictEqual([
          {
            name: 'Open VSCode',
            value: 'open-vscode',
            checked: true,
          },
        ]);
      });
    });
  });

  describe('Confirm delete', () => {
    let questions: any[];
    const project = new Project('fun', '/var/www/html');

    beforeAll(() => {
      questions = buildDeleteProjectConfirmationQuestion(project) as any;
    });

    describe('Tasks question', () => {
      let confirmQuestion: ConfirmQuestion;
      beforeAll(() => {
        confirmQuestion = questions[0];
      });

      it('should contains only one question', () => {
        expect(questions.length).toBe(1);
      });

      it('should be correct definitions', () => {
        expect(confirmQuestion.message).toBe(
          `Are you sure you want to delete "${chalk.yellow(
            project.getAlias(),
          )}"`,
        );
        expect(confirmQuestion.name).toBe('shouldDelete');
        expect(confirmQuestion.type).toBe('confirm');
        expect(confirmQuestion.default).toBe(true);
      });
    });
  });
});
