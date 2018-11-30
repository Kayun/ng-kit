import { Injectable } from '@angular/core'
import { IInlineScript } from './inline-script.interface'

@Injectable({
  providedIn: 'root'
})
export class InlineScriptService implements IInlineScript {

  public getScriptId: () => number

  constructor () {
    let count = 0

    this.getScriptId = (): number => ++count
  }
}
