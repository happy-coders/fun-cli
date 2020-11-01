import { Input } from '../commands';

export abstract class AbstractAction {
  public abstract handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[],
  ): Promise<void>;

  public abstract setup(this: AbstractAction): (...args: any[]) => void;
}
