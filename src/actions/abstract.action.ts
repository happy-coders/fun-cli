import { Input } from '../commands/command.input';

export abstract class AbstractAction {
  setup(this: AbstractAction): (...args: any[]) => void {
    return async (...args: any[]) => {
      const inputs = this.mountInputs(...args);

      try {
        await this.handle(inputs);
      } catch (e) {
        process.exit(1);
      }
    };
  }

  public abstract handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[],
  ): Promise<void>;

  public abstract mountInputs(...args: any[]): Input[];
}
