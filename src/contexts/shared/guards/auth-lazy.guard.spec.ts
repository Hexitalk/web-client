import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authLazyGuard } from './auth-lazy.guard';

describe('authLazyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authLazyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
