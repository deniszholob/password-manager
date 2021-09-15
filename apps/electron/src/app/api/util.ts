import { slash } from '@pwm/util';
import { homedir } from 'os';
import { resolve } from 'path';

/**@return filepath in home folder */
export function homeFile(path: string): string {
  const home = homedir();
  return slash(resolve(home ? home : '', path));
}
