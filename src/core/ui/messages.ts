import chalk from 'chalk';
import emoji from 'node-emoji';

import { Project } from '../project/project.entity';
import { Task } from '../project/tasks/abstract.task';
import { ERROR_PREFIX, SUCCESS_PREFIX } from './prefixes';

interface TaskExecutionStatusChangedOptions {
  endOfLine?: '\r' | '\n';
  amountOfWhitespaces?: number;
}

// Errors
export const PROJECT_NOT_FOUND = (projectAlias: string) =>
  `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
    projectAlias,
  )}\n`;

export const PROJECT_ALREADY_EXISTS = (projectAlias: string) =>
  `\n${ERROR_PREFIX} Already exists a project with alias "${chalk.yellow(
    projectAlias,
  )}"\n`;

export const EMPTY_PROJECTS = `\n${emoji.get(
  'disappointed',
)} No fun projects found! ${emoji.get('face_palm')}`;

// Actions
// Add action
export const ADD_ACTION_SUCCESS = (project: Project) =>
  `\n${emoji.get('tada')} Wow! Your project "${chalk.yellow(
    project.getAlias(),
  )}" has been created with success!\n`;

// With action
export const WITH_ACTION_STARTED = `\nRunning your funny project tasks...\n`;

export const WITH_ACTION_DONE = (project: Project) =>
  `\n${emoji.get('tada')} All tasks for ${chalk.yellow(
    project.getAlias(),
  )} has been executed!\n`;

// Task execution
export const TASK_EXECUTION_STARTED = (task: Task) =>
  TASK_EXECUTION_STATUS_CHANGED(task, 'Executing...', {
    endOfLine: '\r',
  });

export const TASK_EXECUTED_WITH_SUCCESS = (task: Task) =>
  TASK_EXECUTION_STATUS_CHANGED(task, SUCCESS_PREFIX, {
    amountOfWhitespaces: 5,
  });

export const TASK_EXECUTION_FAILED = (task: Task) =>
  TASK_EXECUTION_STATUS_CHANGED(task, ERROR_PREFIX, {
    amountOfWhitespaces: 7,
  });

const TASK_EXECUTION_STATUS_CHANGED = (
  task: Task,
  status: string,
  options: TaskExecutionStatusChangedOptions,
) => {
  const { amountOfWhitespaces = 0, endOfLine = '\n' } = options;

  return `Task to ${chalk.yellow(task.getLabel())}: ${status}${' '.repeat(
    amountOfWhitespaces,
  )}${endOfLine}`;
};

// List action
export const LIST_PROJECTS = (projects: Project[]) => {
  const listItemMarker = '\n- ';
  const projectsAliasesWithHelpCmd = projects.map(
    (project) => `${project.getAlias()}: fun with ${project.getAlias()}`,
  );

  return `\n${emoji.emojify(':grimacing: :clap:')} You have ${chalk.yellow(
    projects.length,
  )} projects to have fun:${listItemMarker}${projectsAliasesWithHelpCmd.join(
    listItemMarker,
  )}\n`;
};

// Help messages
export const LIST_PROJECTS_HELP = `Run "${chalk.yellow(
  'fun projects',
)}" for a list of existent commands.\n`;

export const RUN_COMMAND_HELP = (project: Project) =>
  `${emoji.get('point_right')} Run "${chalk.yellow(
    `fun with ${project.getAlias()}`,
  )}" command and be happy!\n`;

export const PROJECT_DETAILS_HELP = (projectAlias?: string) =>
  `${emoji.get('point_right')} Run "${chalk.yellow(
    `fun details ${projectAlias ?? '<project-alias>'}`,
  )}" for more details about project.\n`;

export const ADD_PROJECT_HELP = `\n${emoji.get(
  'point_right',
)} Run "${chalk.yellow(
  'fun add <project-alias> --path <path-to-project>',
)}" to add a fun project!`;
