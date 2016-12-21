/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShellExecutionService } from './shell-execution.service';

describe('ShellExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellExecutionService]
    });
  });

  it('should ...', inject([ShellExecutionService], (service: ShellExecutionService) => {
    expect(service).toBeTruthy();
  }));
});
