import { IconSrcOptions } from '../icon-src-options.enum';
import { Recovery } from '../recovery/recovery.model';

export interface Entry {
  guid: string;
  serviceName: string;
  email?: string;
  password: string;
  username: string;
  serviceUrl?: string;
  recovery?: Recovery[];
  tags?: string[];
  notes?: string;
  usedTimes: number;
  iconSrc?: IconSrcOptions;
}
