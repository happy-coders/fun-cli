import chalk from 'chalk';
import emoji from 'node-emoji';

import { Project } from '../project/project.entity';
import { Task } from '../project/tasks/abstract.task';
import { ERROR_PREFIX, SUCCESS_PREFIX } from './prefixes';

interface TaskExecutionStatusChangedOptions {
  endOfLine?: '\r' | '\n';
  amountOfWhitespaces?: number;
}

interface PrefixedMessageOptions {
  startWithNewLine: boolean;
}

const mountEmojiPrefixedMessage = (
  emojiName: string,
  message: string,
  options?: PrefixedMessageOptions,
) => mountPrefixedMessage(emoji.get(emojiName), message, options);

const mountErrorPrefixedMessage = (message: string) =>
  mountPrefixedMessage(ERROR_PREFIX, message);

const mountPrefixedMessage = (
  prefix: string,
  message: string,
  options?: PrefixedMessageOptions,
) => {
  const { startWithNewLine = true } = options ?? {};

  return `${startWithNewLine ? '\n' : ''}${prefix} ${message}\n`;
};

// Errors
export const PROJECT_NOT_FOUND = (projectAlias: string) =>
  mountErrorPrefixedMessage(
    `Not found a project with alias: ${chalk.red(projectAlias)}`,
  );

export const PROJECT_ALREADY_EXISTS = (projectAlias: string) =>
  mountErrorPrefixedMessage(
    `Already exists a project with alias "${chalk.yellow(projectAlias)}"`,
  );

export const EMPTY_PROJECTS = mountEmojiPrefixedMessage(
  'disappointed',
  `No fun projects found! ${emoji.get('face_palm')}`,
);

export const UNEXPECTED_ERROR = mountEmojiPrefixedMessage(
  'disappointed_relieved',
  `Whoops, something went wrong! It's not fun...`,
);

// Actions
// Add action
export const ADD_ACTION_SUCCESS = (project: Project) =>
  mountEmojiPrefixedMessage(
    'tada',
    `Wow! Your project "${chalk.yellow(
      project.getAlias(),
    )}" has been created with success!`,
  );

// With action
export const WITH_ACTION_STARTED = `\nRunning your funny project tasks...\n`;

export const WITH_ACTION_DONE = (project: Project) =>
  mountEmojiPrefixedMessage(
    'tada',
    `All tasks for ${chalk.yellow(project.getAlias())} has been executed!`,
  );

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

  return mountPrefixedMessage(
    emoji.emojify(':grimacing: :clap:'),
    `You have ${chalk.yellow(
      projects.length,
    )} projects to have fun:${listItemMarker}${projectsAliasesWithHelpCmd.join(
      listItemMarker,
    )}`,
  );
};

// Delete action
export const PROJECT_DELETED_WITH_SUCCESS = (project: Project) =>
  mountEmojiPrefixedMessage(
    'disappointed',
    `The project "${project.getAlias()}" is not fun anymore, it happens...`,
  );

export const NOT_CONFIRMED_DELETION = mountEmojiPrefixedMessage(
  'sweat_smile',
  'Phew, that was close...',
);

// Help messages
export const LIST_PROJECTS_HELP = `Run "${chalk.yellow(
  'fun list',
)}" for a list of existent commands.\n`;

export const RUN_COMMAND_HELP = (project: Project) =>
  mountEmojiPrefixedMessage(
    'point_right',
    `Run "${chalk.yellow(
      `fun with ${project.getAlias()}`,
    )}" command and be happy!`,
    {
      startWithNewLine: false,
    },
  );

export const PROJECT_DETAILS_HELP = (projectAlias?: string) =>
  mountEmojiPrefixedMessage(
    'point_right',
    `Run "${chalk.yellow(
      `fun details ${projectAlias ?? '<project-alias>'}`,
    )}" for more details about project.`,
    {
      startWithNewLine: false,
    },
  );

export const ADD_PROJECT_HELP = mountEmojiPrefixedMessage(
  'point_right',
  `Run "${chalk.yellow(
    'fun add <project-alias> --path <path-to-project>',
  )}" to add a fun project!`,
  {
    startWithNewLine: false,
  },
);

// Jokes
export const DELETE_FAIL_JOKE = (project: Project) =>
  mountEmojiPrefixedMessage(
    'thought_balloon',
    `Be positive! At least you can have fun with "${project.getAlias()}" for the last time...`,
  );
