import { InjectionToken, Provider } from '@angular/core'
import { IdGenerator } from '@ng-assets/core'

export interface InlineScriptConfig {
  idGenerator?: Provider
}

export const INLINE_SCRIPT_ID_GENERATOR = new InjectionToken<IdGenerator>('INLINE_SCRIPT_ID_GENERATOR')
