import * as fs from 'fs';

import { FileManager } from '../../../../../../src/lib/project/persistence/manager/file.manager';
import { Project } from '../../../../../../src/lib/project/project.entity';

const fixturesPath = `${__dirname}/../../../../../fixtures`;

describe('File manager', () => {
  describe('Create', () => {
    describe('When folder not exists', () => {
      const path = `${fixturesPath}/not-existent-folder`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = fileManager.create(project);
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
        fs.rmdirSync(path);
      });

      it('should create the project in a new file', async () => {
        expect(result).toBe(true);

        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [project],
          }),
        );
      });
    });

    describe('When folder already exists', () => {
      const path = `${fixturesPath}/projects-folder`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = fileManager.create(project);
      });

      afterAll(() => {
        fs.unlinkSync(projectsFile);
      });

      it('should create the projects file on existent folder', async () => {
        expect(result).toBe(true);

        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [project],
          }),
        );
      });
    });

    describe('When projects file already exists', () => {
      const path = `${fixturesPath}/projects-file`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = fileManager.create(project);
      });

      afterAll(() => {
        // Reset file
        fs.writeFileSync(projectsFile, JSON.stringify({ projects: [] }));
      });

      it('should add project to existent file', async () => {
        expect(result).toBe(true);

        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [project],
          }),
        );
      });
    });

    describe('When already have projects created', () => {
      const path = `${fixturesPath}/with-projects`;
      const projectsFile = `${path}/projects.json`;
      const existentProject = {
        alias: 'existent',
        path: '~/Projects/test',
        tasks: [{ name: 'open-vscode' }],
      };
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = await fileManager.create(project);
      });

      afterAll(() => {
        // Reset file
        fs.writeFileSync(
          projectsFile,
          JSON.stringify({
            projects: [existentProject],
          }),
        );
      });

      it('should add project to existent file', async () => {
        expect(result).toBe(true);

        expect(fs.existsSync(projectsFile)).toBe(true);

        const fileContent = fs.readFileSync(projectsFile).toString();

        expect(fileContent).toStrictEqual(
          JSON.stringify({
            projects: [existentProject, project],
          }),
        );
      });
    });
  });
});
