import { CheckboxQuestion } from 'inquirer';

import { buildProjectQuestions } from '../../../../src/lib/project/builder/questions.builder';

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
});
