import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InlineScriptComponent } from './inline-script.component'

describe('InlineScriptComponent', () => {
  let component: InlineScriptComponent
  let fixture: ComponentFixture<InlineScriptComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineScriptComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineScriptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
