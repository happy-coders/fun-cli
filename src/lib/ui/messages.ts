import { Project } from './../project/project.entity';
import chalk from 'chalk';
import emoji from 'node-emoji';
import { Task } from '../project/tasks/abstract.task';

import { ERROR_PREFIX, SUCCESS_PREFIX } from './prefixes';

// Errors
export const PROJECT_NOT_FOUND = (projectAlias: string) =>
  `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
    projectAlias,
  )}\n`;

// Actions
export const WITH_ACTION_STARTED = `\nRunning your funny project tasks...\n`;

export const WITH_ACTION_DONE = (project: Project) =>
  `\n${emoji.get('tada')} All tasks for ${chalk.yellow(
    project.getAlias(),
  )} has been executed! Don't worry. Be happy! ${emoji.emojify(
    ':grin: :computer: :thought_balloon: :moneybag:',
  )}\n`;

// Task execution

export const TASK_EXECUTION_STARTED = (task: Task) =>
  `Task to ${chalk.yellow(task.getLabel())}: Executing...\r`;

export const TASK_EXECUTED_WITH_SUCCESS = (task: Task) =>
  `Task to ${chalk.yellow(task.getLabel())}: ${SUCCESS_PREFIX}     \n`;

export const TASK_EXECUTION_FAILED = (task: Task) =>
  `Task to ${chalk.yellow(task.getLabel())}: ${ERROR_PREFIX}       \n`;

// Help messages
export const LIST_PROJECTS_HELP = `Run "${chalk.yellow(
  'fun projects',
)}" for a list of existent commands.\n`;
