import * as fs from 'fs';

import { Project } from '../../../../../../lib/project/project.entity';
import { FileManager } from '../../../../../../lib/project/persistence/manager/file.manager';

describe('File manager', () => {
  describe('Create', () => {
    describe('When folder not exists', () => {
      const path = `${__dirname}/../../../../fixtures/not-existent-folder`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = await fileManager.create(project);
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
      const path = `${__dirname}/../../../../fixtures/projects-folder`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = await fileManager.create(project);
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
      const path = `${__dirname}/../../../../fixtures/projects-file`;
      const projectsFile = `${path}/projects.json`;
      let project: Project;

      let result: boolean;
      beforeAll(async () => {
        const fileManager = new FileManager(path);

        project = new Project('funny', '~/Projects');
        result = await fileManager.create(project);
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
      const path = `${__dirname}/../../../../fixtures/with-projects`;
      const projectsFile = `${path}/projects.json`;
      const existentProject = {
        alias: 'existent',
        path: '~/Projects/test',
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
