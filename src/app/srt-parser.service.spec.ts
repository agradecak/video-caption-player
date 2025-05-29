import { TestBed } from '@angular/core/testing';

import { SrtParserService } from './srt-parser.service';

describe('SrtParserService', () => {
  let service: SrtParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrtParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
