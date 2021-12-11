import { TestBed } from '@angular/core/testing';

import { TilesRepositoryService } from './tiles-repository.service';

describe('TilesRepositoryService', () => {
  let service: TilesRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilesRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
