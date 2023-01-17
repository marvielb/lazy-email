import { TestBed } from '@angular/core/testing';

import { SendUnsavedGuard } from './send-unsaved.guard';

describe('SendUnsavedGuard', () => {
  let guard: SendUnsavedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SendUnsavedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
