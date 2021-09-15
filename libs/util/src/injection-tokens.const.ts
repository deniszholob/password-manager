import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  production: boolean;
}
export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>(
  'Environment-Configuration'
);
