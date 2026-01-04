import { IconSrcOptions } from '../icon-src-options.enum';
import { Recovery } from '../recovery/recovery.model';

export interface Entry {
  guid: string;
  dateCreated: number;
  dateAccessed: number;
  usedTimes: number;
  password: string;
  serviceName: string;
  username: string;
  iconSrc?: IconSrcOptions;
  recovery?: Recovery[];
  notes?: string;
  serviceUrl?: string;
  email?: string;
  tags?: string[];
}
