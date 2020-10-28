import * as fs from 'fs';

import { FileManager } from '../../../../../../lib/project/persistence/manager/file.manager';
import { Project } from '../../../../../../lib/project/project.entity';

describe('File manager', () => {
  describe('Find One', () => {
    describe('When folder not exists', () => {
      const path = `${__dirname}/../../../../fixtures/not-existent-folder`;
      const projectsFile = `${path}/projects.json`;
      const alias = 'funny';

      let result: Project | undefined;

      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.findOne(alias);
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
        fs.rmdirSync(path);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });

      it('should create the new file with empty content', () => {
        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [],
          }),
        );
      });
    });

    describe('When folder already exists', () => {
      const path = `${__dirname}/../../../../fixtures/projects-folder`;
      const projectsFile = `${path}/projects.json`;

      let result: Project | undefined;
      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.findOne('project');
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });

      it('should create the new file with empty content', () => {
        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [],
          }),
        );
      });
    });

    describe('When projects file already exists', () => {
      const path = `${__dirname}/../../../../fixtures/projects-file`;
      const projectsFile = `${path}/projects.json`;

      let result: Project | undefined;
      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.findOne('project');
      });

      afterAll(() => {
        // Reset file
        fs.writeFileSync(projectsFile, JSON.stringify({ projects: [] }));
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });

      it('should keep the file with empty content', () => {
        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [],
          }),
        );
      });
    });

    describe('When already have projects created', () => {
      const path = `${__dirname}/../../../../fixtures/with-projects`;
      let fileManager: FileManager;

      beforeAll(() => {
        fileManager = new FileManager(path);
      });

      describe('Find not existent project', () => {
        let result: Project | undefined;
        beforeAll(() => {
          result = fileManager.findOne('not_existent');
        });

        it('should return the project', () => {
          expect(result).toBeUndefined();
        });
      });

      describe('Find existent project', () => {
        const existentProject = {
          alias: 'existent',
          path: '~/Projects/test',
          tasks: [{ name: 'open-vscode' }],
        };

        let result: Project | undefined;
        beforeAll(() => {
          result = fileManager.findOne('existent');
        });

        it('should return the project', () => {
          expect(result).toEqual(existentProject);
        });
      });
    });
  });
});
