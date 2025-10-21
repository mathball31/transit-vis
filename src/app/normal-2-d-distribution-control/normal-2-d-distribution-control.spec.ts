import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Normal2DDistributionControl } from './normal-2-d-distribution-control';

describe('Normal2DDistributionControl', () => {
  let component: Normal2DDistributionControl;
  let fixture: ComponentFixture<Normal2DDistributionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Normal2DDistributionControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Normal2DDistributionControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
