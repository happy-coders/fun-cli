import * as fs from 'fs';

import { FileManager } from '../../../../../../core/project/persistence/manager/file.manager';
import { Project } from '../../../../../../core/project/project.entity';
import { OpenVSCode } from '../../../../../../core/project/tasks/open-editor/vscode.task';
import { assertCreatedFileWithEmptyContent } from './common-asserts';

const fixturesPath = `${__dirname}/../../../../../fixtures`;

describe('File manager', () => {
  describe('List All', () => {
    describe('When folder not exists', () => {
      const path = `${fixturesPath}/not-existent-folder`;
      const projectsFile = `${path}/projects.json`;

      let result: Project[];

      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.listAll();
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
        fs.rmdirSync(path);
      });

      it('should return empty list', () => {
        expect(result).toBeEmpty();
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When folder already exists', () => {
      const path = `${fixturesPath}/projects-folder`;
      const projectsFile = `${path}/projects.json`;

      let result: Project[];
      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.listAll();
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
      });

      it('should return undefined', () => {
        expect(result).toBeEmpty();
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When projects file already exists', () => {
      const path = `${fixturesPath}/projects-file`;
      const projectsFile = `${path}/projects.json`;

      let result: Project[];
      beforeAll(() => {
        const fileManager = new FileManager(path);

        result = fileManager.listAll();
      });

      afterAll(() => {
        // Reset file
        fs.writeFileSync(projectsFile, JSON.stringify({ projects: [] }));
      });

      it('should return undefined', () => {
        expect(result).toBeEmpty();
      });

      assertCreatedFileWithEmptyContent(projectsFile);
    });

    describe('When already have projects created', () => {
      const path = `${fixturesPath}/unordered-projects-list`;
      const a = new Project('a', '~/Projects/test');
      a.addTask(new OpenVSCode());

      const z = new Project('z', '~/Projects/test');
      z.addTask(new OpenVSCode());

      const existentProjects = [a, z];

      let result: Project[];
      beforeAll(() => {
        const fileManager = new FileManager(path);
        result = fileManager.listAll();
      });

      it('should return the projects in alphabetical order', () => {
        expect(result).toStrictEqual(existentProjects);
      });
    });
  });
});
