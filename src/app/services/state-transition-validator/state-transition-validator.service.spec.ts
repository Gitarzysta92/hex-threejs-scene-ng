import { TestBed } from '@angular/core/testing';

import { StateTransitionValidatorService } from './state-transition-validator.service';

describe('StateTransitionValidatorService', () => {
  let service: StateTransitionValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateTransitionValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
