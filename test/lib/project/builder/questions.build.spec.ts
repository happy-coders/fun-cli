import { CheckboxQuestion } from 'inquirer';

import { buildProjectQuestions } from '../../../../lib/project/builder/questions.builder';

describe('Build questions', () => {
  describe('For project', () => {
    let questions: any[];
    beforeAll(() => {
      questions = buildProjectQuestions() as any;
    });

    describe('Actions question', () => {
      let actionsQuestion: CheckboxQuestion;
      beforeAll(() => {
        actionsQuestion = questions[0];
      });

      it('should be correct definitions', () => {
        expect(actionsQuestion.message).toBe(
          'What will happen when the project opens?',
        );
        expect(actionsQuestion.name).toBe('actions');
        expect(actionsQuestion.type).toBe('checkbox');
        expect(actionsQuestion.choices).toStrictEqual([
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
