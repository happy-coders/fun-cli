/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    /**
     * Checks file/dir exists defined on `expect` command exists.
     *
     * @param content - File content to assert
     */
    toHaveBeenCreated(content?: string): R;
  }
}
