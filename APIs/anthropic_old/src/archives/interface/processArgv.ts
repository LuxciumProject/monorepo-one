import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function processArgv(argv: string[]) {
  return yargs(hideBin(argv))
    .options({
      max_tokens: { type: 'number', default: 1024, describe: 'Maximum tokens' },
      user_id: { type: 'string', describe: 'User ID' },
      temperature: {
        type: 'number',
        default: 0.95,
        describe: 'Randomness control',
      },
      top_k: { type: 'number', describe: 'Token filter' },
      top_p: { type: 'number', describe: 'Nucleus sampling' },
    })
    .help().argv;
}
