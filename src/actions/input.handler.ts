import { Input } from './../commands/command.input';

export function getProjectAlias(inputs: Input[]): string {
  const aliasInput: Input = inputs.find(
    (input) => input.name === 'alias',
  ) as Input;

  if (!aliasInput) {
    throw new Error('No alias found in command input');
  }

  return aliasInput.value as string;
}
