import { CheckboxQuestion, ConfirmQuestion, InputQuestion } from 'inquirer';

import {
  buildMoreSubprojectQuestion,
  buildProjectQuestions,
} from '../../../../lib/project/builder/questions.builder';
import { Project } from '../../../../lib/project/project.entity';

describe('Build questions', () => {
  describe('For project', () => {
    describe.each([
      [undefined, 'project'],
      [new Project('test', __dirname), 'subproject'],
    ])('With params: %s', (params, target) => {
      let questions: any[];
      beforeAll(() => {
        questions = buildProjectQuestions(params) as any;
      });

      it(`should contains questions messages with ${target} on target`, () => {
        const messages = questions.map((question) => question.message);

        expect(messages).toStrictEqual([
          `Where is your ${target} folder?`,
          `Does your ${target} have subprojects?`,
          `What will happen when this ${target} opens?`,
        ]);
      });

      describe('Path question', () => {
        let pathQuestion: InputQuestion;
        beforeAll(() => {
          pathQuestion = questions[0];
        });
        it('should be the 1st question', () => {
          expect(pathQuestion.name).toBe('path');
          expect(pathQuestion.type).toBe('input');
        });
      });

      describe('Has subprojects question', () => {
        let hasSubprojectsQuestion: ConfirmQuestion;
        beforeAll(() => {
          hasSubprojectsQuestion = questions[1];
        });
        it('should be the 2nd question', () => {
          expect(hasSubprojectsQuestion.name).toBe('hasSubprojects');
          expect(hasSubprojectsQuestion.type).toBe('confirm');
        });
      });

      describe('Actions question', () => {
        let actionsQuestion: CheckboxQuestion;
        beforeAll(() => {
          actionsQuestion = questions[2];
        });

        it('should be the 2rd question', () => {
          expect(actionsQuestion.name).toBe('actions');
          expect(actionsQuestion.type).toBe('checkbox');
          expect(actionsQuestion.choices).toStrictEqual([
            {
              name: 'Open VSCode',
              value: 'open-vscode',
            },
          ]);
          expect(typeof actionsQuestion.when === 'function').toBe(true);
        });

        describe('When project has subprojects', () => {
          it('should not show actions question', () => {
            if (typeof actionsQuestion.when === 'function') {
              expect(
                actionsQuestion.when({
                  hasSubprojects: true,
                }),
              ).toBe(false);
            }
          });
        });

        describe('When project has no subprojects', () => {
          it('should show actions question', () => {
            if (typeof actionsQuestion.when === 'function') {
              expect(
                actionsQuestion.when({
                  hasSubprojects: false,
                }),
              ).toBe(true);
            }
          });
        });
      });
    });
  });

  describe('For subproject', () => {
    it('should contains question asking about new subproject for parent', () => {
      const alias = 'awesome_project';

      const questions = buildMoreSubprojectQuestion(
        new Project(alias, __dirname),
      ) as any[];

      expect(questions.length).toBe(1);

      const uniqueQuestion: ConfirmQuestion = questions[0];

      expect(uniqueQuestion.name).toBe('haveMoreSubprojects');
      expect(uniqueQuestion.type).toBe('confirm');
      expect(uniqueQuestion.message).toBe(
        `Have more subprojects for ${alias}?`,
      );
    });
  });
});
