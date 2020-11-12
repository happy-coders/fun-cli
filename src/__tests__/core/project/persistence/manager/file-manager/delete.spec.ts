import * as fs from 'fs';

import { FileManager } from '../../../../../../lib/core/project/persistence/manager/file.manager';
import { assertCreatedFileWithEmptyContent } from './common-asserts';

const fixturesPath = `${__dirname}/../../../../../fixtures`;

describe('File manager', () => {
  describe('Delete', () => {
    describe('When folder not exists', () => {
      const path = `${fixturesPath}/not-existent-folder`;
      const projectsFile = `${path}/projects.json`;
      const alias = 'funny';

      let result: boolean;

      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.delete(alias);
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
        fs.rmdirSync(path);
      });

      it('should return undefined', () => {
        expect(result).toBe(false);
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When folder already exists', () => {
      const path = `${fixturesPath}/projects-folder`;
      const projectsFile = `${path}/projects.json`;

      let result: boolean;

      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.delete('project');
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
      });

      it('should return undefined', () => {
        expect(result).toBe(false);
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When projects file already exists', () => {
      const path = `${fixturesPath}/projects-file`;
      const projectsFile = `${path}/projects.json`;

      let result: boolean;

      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.delete('project');
      });

      afterAll(() => {
        // Reset file
        fs.writeFileSync(projectsFile, JSON.stringify({ projects: [] }));
      });

      it('should return undefined', () => {
        expect(result).toBe(false);
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When already have projects created', () => {
      const path = `${fixturesPath}/unordered-projects-list`;
      const projectsFile = `${path}/projects.json`;

      const existentProjects = [
        {
          'alias': 'z',
          'path': '~/Projects/test',
          'tasks': [{ 'name': 'open-vscode' }],
        },
        {
          'alias': 'a',
          'path': '~/Projects/test',
          'tasks': [{ 'name': 'open-vscode' }],
        },
      ];

      let fileManager: FileManager;

      beforeAll(() => {
        fileManager = new FileManager(path);
      });

      describe('Delete not existent project', () => {
        let result: boolean;
        beforeAll(() => {
          result = fileManager.delete('not_existent');
        });

        it('should return false', () => {
          expect(result).toBe(false);
        });

        it('should keep the existent projects', () => {
          expect(projectsFile).toHaveBeenCreated(
            JSON.stringify({ projects: existentProjects }),
          );
        });
      });

      describe('Delete existent project', () => {
        let result: boolean;
        beforeAll(() => {
          result = fileManager.delete('a');
        });

        afterAll(() => {
          fs.writeFileSync(
            projectsFile,
            JSON.stringify({ projects: existentProjects }),
          );
        });

        it('should return true', () => {
          expect(result).toBe(true);
        });

        it('should remove project', () => {
          expect(projectsFile).toHaveBeenCreated(
            JSON.stringify({
              projects: [
                {
                  'alias': 'z',
                  'path': '~/Projects/test',
                  'tasks': [{ 'name': 'open-vscode' }],
                },
              ],
            }),
          );
        });
      });
    });
  });
});
