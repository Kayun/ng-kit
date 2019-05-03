import { ModuleWithProviders, NgModule } from '@angular/core'

import { InlineScriptComponent } from './inline-script.component'
import { InlineScriptConfig } from './inline-script.config'
import { inlineScriptDefaultIdGeneratorProvider } from './inline-script.provider'

@NgModule({
  declarations: [ InlineScriptComponent ],
  imports: [],
  exports: [ InlineScriptComponent ]
})
export class InlineScriptModule {

  public static forRoot (config: InlineScriptConfig = {}): ModuleWithProviders {
    return {
      ngModule: InlineScriptModule,
      providers: [
        Boolean(config.idGenerator) ? config.idGenerator : inlineScriptDefaultIdGeneratorProvider
      ]
    }
  }
}
