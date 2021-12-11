import { TestBed } from '@angular/core/testing';

import { StateTransitionService } from './state-transition.service';

describe('StateTransitionService', () => {
  let service: StateTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
