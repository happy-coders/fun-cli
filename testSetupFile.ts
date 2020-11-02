import * as fs from 'fs';
import {
  matcherHint,
  MatcherHintOptions,
  printExpected,
  printReceived,
} from 'jest-matcher-utils';

function hintMessage(
  matcherName: string,
  expected: any,
  received: any,
  options?: MatcherHintOptions,
) {
  return (
    matcherHint(matcherName, undefined, undefined, options) +
    '\n\n' +
    `Expected: ${printExpected(expected)}\n` +
    `Received: ${printReceived(received)}`
  );
}

function registerFsMatchers() {
  expect.extend({
    toHaveBeenCreated(path: string, expectedContent?: string) {
      const exists = fs.existsSync(path);

      let receivedContent = '';
      let sameContent = true;
      if (expectedContent) {
        receivedContent = fs.readFileSync(path).toString();

        sameContent = Object.is(receivedContent, expectedContent);
      }

      const message = !exists
        ? `Failed asserting exists in path "${path}"`
        : hintMessage('toHaveBeenCreated', expectedContent, receivedContent, {
            isNot: this.isNot,
            promise: this.promise,
          });

      return {
        message: () => message,
        pass: exists && sameContent,
      };
    },
  });
}

beforeAll(() => {
  registerFsMatchers();
});
