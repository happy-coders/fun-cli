import { homedir } from 'os';

import { AbstractManager } from './abstract.manager';
import { FileManager } from './file.manager';

export function createManager(driver = 'file'): AbstractManager {
  if (driver === 'file') {
    return new FileManager(`${homedir()}/.fun-cli`);
  }

  throw new Error(`Manager factory not found for driver "${driver}"`);
}
