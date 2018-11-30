import { ModuleWithProviders, NgModule } from '@angular/core'

import { InlineScriptComponent } from './inline-script.component'
import { InlineScriptService } from './inline-script.service'
import { IInlineScript } from './inline-script.interface'

@NgModule({
  declarations: [ InlineScriptComponent ],
  imports: [],
  exports: [ InlineScriptComponent ]
})
export class InlineScriptModule {

  public static forRoot (): ModuleWithProviders {
    return {
      ngModule: InlineScriptModule,
      providers: [
        {
          provide: IInlineScript,
          useClass: InlineScriptService
        }
      ]
    }
  }
}
