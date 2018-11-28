import { AfterViewInit, Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core'

@Component({
  selector: 'ng-kit-inline-script',
  templateUrl: './inline-script.component.html',
  styles: []
})
export class InlineScriptComponent implements AfterViewInit {

  @ViewChild('template')
  private template: TemplateRef<void>

  constructor (
    private renderer: Renderer2,
    private element: ElementRef
  ) { }

  public ngAfterViewInit () {
    const view = this.template.createEmbeddedView(null)
    const contentTextNode: Node = view.rootNodes.find((node: Node) => node.nodeType === 3)

    if (!Boolean(contentTextNode)) {
      return undefined
    }

    this.createScriptElement(contentTextNode.nodeValue)
  }

  private createScriptElement (textScript: string): void {

    const script = this.renderer.createElement('script')
    const text = this.renderer.createText(textScript)

    this.renderer.setAttribute(script, 'type', 'text/javascript')
    this.renderer.appendChild(script, text)
    this.renderer.appendChild(this.element.nativeElement, script)
  }
}
