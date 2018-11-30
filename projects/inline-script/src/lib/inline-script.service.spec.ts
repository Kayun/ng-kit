import { TestBed } from '@angular/core/testing'

import { InlineScriptService } from './inline-script.service'

describe('InlineScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: InlineScriptService = TestBed.get(InlineScriptService)
    expect(service).toBeTruthy()
  })
})
