import { AddAction } from '../../actions/add.action';
import { OpenVSCode } from '../../lib/project/actions/open-vscode.action';
import * as projectBuilder from '../../lib/project/builder/project.builder';
import * as projectQuestionsBuilder from '../../lib/project/builder/questions.builder';
import { Project } from '../../lib/project/project.entity';

jest.mock('../../lib/project/builder/project.builder');
jest.mock('../../lib/project/builder/questions.builder');

const buildProject = projectBuilder.buildProject as jest.MockedFunction<
  typeof projectBuilder.buildProject
>;
const buildProjectQuestions = projectQuestionsBuilder.buildProjectQuestions as jest.MockedFunction<
  typeof projectQuestionsBuilder.buildProjectQuestions
>;

describe('Add action', () => {
  describe('Handle', () => {
    describe('Without alias on inputs', () => {
      it('should throw error', () => {
        const action = new AddAction();
        expect(() => action.handle([])).rejects.toThrowError(
          'No alias found in command input',
        );
      });
    });

    describe('With alias', () => {
      const alias = 'funniest-project';
      const questions = ['fake-questions'];
      let action: AddAction;
      const projectDefinitionsFactory = () => {
        const project = new Project(alias, __dirname);

        const api = new Project(alias, 'api');
        api.addAction(new OpenVSCode());

        project.addSubproject(api);

        return project;
      };
      beforeAll(async () => {
        buildProjectQuestions.mockReturnValue(questions);

        buildProject.mockResolvedValue(projectDefinitionsFactory());

        action = new AddAction();
        await action.handle([
          {
            name: 'alias',
            value: alias,
          },
        ]);
      });

      it('should build project from build project questions', () => {
        expect(buildProject).toHaveBeenCalledWith(alias, questions);
      });

      it('should persist the built project', () => {});
    });
  });
});
