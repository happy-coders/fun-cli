import * as fs from 'fs';

import { Project } from '../../project.entity';
import { AbstractManager } from './abstract.manager';

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

  async create(project: Project): Promise<boolean> {
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

    if (!content.projects) {
      const freshContent = this._freshProjectContent();
      this._write(freshContent);

      return freshContent;
    }

    return content;
  }

  private _ensureProjectsFolderExists() {
    if (!this._projectsFolderExists()) {
      this._createProjectsFolder();
    }
  }

  private _createFreshProjectsFile() {
    this._write({ projects: [] });
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

  public listAll(): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  public findOne(alias: string): Promise<Project | undefined> {
    throw new Error('Method not implemented.');
  }
  public update(alias: string, project: Project): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public delete(alias: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
