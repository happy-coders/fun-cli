import { FileManager } from '../../../../../lib/project/persistence/manager/file.manager';
import { createManager } from '../../../../../lib/project/persistence/manager/manager.factory';

describe('Manager factory', () => {
  describe('With default driver', () => {
    it('should return an instance of FileManager', async () => {
      const manager = await createManager();

      expect(manager).toBeInstanceOf(FileManager);
    });
  });

  describe('With not existent driver', () => {
    it('should throw error', async (done) => {
      const driver = 'not_existent';
      try {
        await createManager(driver);
      } catch (err) {
        expect(err.message).toBe(
          `Manager factory not found for driver "${driver}"`,
        );
        done();
      }
    });
  });
});
