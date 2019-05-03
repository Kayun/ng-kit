import { FactoryProvider } from '@angular/core'
import { IdGenerator } from '@ng-assets/core'

export class InlineScriptDefaultIdGenerator implements IdGenerator {

  public static ID_PREFIX = 'nga-inline-sprite-'

  private readonly getInternalId: () => number

  constructor () {
    let count = 0

    this.getInternalId = (): number => count++
  }

  public getId (): string {
    return `${ InlineScriptDefaultIdGenerator.ID_PREFIX }${ this.getInternalId() }`
  }
}

export function InlineScriptDefaultIdGeneratorFactory (): IdGenerator {
  return new InlineScriptDefaultIdGenerator()
}

export const inlineScriptDefaultIdGeneratorProvider: FactoryProvider = {
  provide: IdGenerator,
  useFactory: InlineScriptDefaultIdGeneratorFactory
}
