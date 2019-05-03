import {
  ChangeDetectionStrategy, Component, ElementRef,
  Inject, Input, OnInit, Optional, PLATFORM_ID, Renderer2
} from '@angular/core'
import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser'
import { IdGenerator } from '@ng-assets/core'

@Component({
  selector: 'nga-inline-script',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineScriptComponent implements OnInit {

  @Input()
  private script: string = ''

  private readonly element: HTMLElement = null

  private readonly transferKey: StateKey<boolean> = null

  constructor (
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private idGenerator: IdGenerator,
    @Optional() private transfer: TransferState,
    @Inject(PLATFORM_ID) private platform: string
  ) {
    this.element = this.elementRef.nativeElement

    if (Boolean(this.transfer)) {
      const id = this.idGenerator.getId()
      this.transferKey = makeStateKey(id)
    }
  }

  public ngOnInit () {
    if (!Boolean(this.script)) {
      return undefined
    }

    if (
      isPlatformBrowser(this.platform) &&
      Boolean(this.transfer) &&
      this.transfer.hasKey(this.transferKey)
    ) {
      this.transfer.remove(this.transferKey)
      return undefined
    }

    this.createScriptElement(this.script)
  }

  private createScriptElement (textScript: string): void {
    const script = this.renderer.createElement('script')
    const text = this.renderer.createText(textScript)
    const parent = this.renderer.parentNode(this.element)

    this.renderer.setAttribute(script, 'type', 'text/javascript')
    this.renderer.appendChild(script, text)
    this.renderer.insertBefore(parent, script, this.element)

    if (isPlatformServer(this.platform) && Boolean(this.transfer)) {
      this.transfer.set(this.transferKey, true)
    }
  }
}
