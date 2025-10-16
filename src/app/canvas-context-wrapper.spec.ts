import { TestBed } from '@angular/core/testing';

import { CanvasContextWrapper } from './canvas-context-wrapper';

describe('CanvasContext', () => {
  let service: CanvasContextWrapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasContextWrapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
