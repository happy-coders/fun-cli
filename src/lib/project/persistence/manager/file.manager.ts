import * as fs from 'fs';
import { sortBy } from 'lodash';

import { Project } from '../../project.entity';
import { TaskName } from '../../tasks/abstract.task';
import { createTask } from '../../tasks/task.factory';
import { AbstractManager } from './abstract.manager';

interface RawProject {
  alias: string;
  path: string;
  tasks: { name: TaskName }[];
}

export interface ProjectsFileContent {
  projects: Project[];
}

const PROJECTS_FILE_NAME = 'projects.json';
export class FileManager extends AbstractManager {
  private filePath: string;

  constructor(private path: string) {
    super();

    this.filePath = `${path}/${PROJECTS_FILE_NAME}`;
  }

  create(project: Project): boolean {
    this._ensureProjectsFolderExists();

    const content = this._getProjectsFileContent();

    content.projects.push(project);

    this._write(content);

    return true;
  }

  private _getProjectsFileContent(): ProjectsFileContent {
    if (!this._projectsFileExists()) {
      this._createFreshProjectsFile();
    }

    const buffer = fs.readFileSync(this.filePath);

    const content = JSON.parse(buffer.toString());

    const projects = content.projects.map((project: RawProject) => {
      const instance = new Project(project.alias, project.path);
      project.tasks.forEach((task) => {
        instance.addTask(createTask(task.name));
      });
      return instance;
    });

    return { projects };
  }

  private _ensureProjectsFolderExists() {
    if (!this._projectsFolderExists()) {
      this._createProjectsFolder();
    }
  }

  private _createFreshProjectsFile() {
    this._write(this._freshProjectContent());
  }

  private _freshProjectContent() {
    return { projects: [] };
  }

  private _write(content: ProjectsFileContent) {
    fs.writeFileSync(this.filePath, JSON.stringify(content));
  }

  private _projectsFolderExists() {
    return fs.existsSync(this.path);
  }

  private _projectsFileExists() {
    return fs.existsSync(this.filePath);
  }

  private _createProjectsFolder() {
    fs.mkdirSync(this.path, { recursive: true });
  }

  public listAll(): Project[] {
    this._ensureProjectsFolderExists();

    const content = this._getProjectsFileContent();

    return sortBy(content.projects, (project) => project.getAlias());
  }

  public findOne(alias: string): Project | undefined {
    this._ensureProjectsFolderExists();

    const content = this._getProjectsFileContent();

    return content.projects.find((project) => project.isSameAlias(alias));
  }

  public update(alias: string, project: Project): Promise<boolean> {
    console.log(alias, project);

    throw new Error('Method not implemented.');
  }

  public delete(alias: string): Promise<boolean> {
    console.log(alias);
    throw new Error('Method not implemented.');
  }
}
