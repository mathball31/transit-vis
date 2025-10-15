import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalDistributionControl } from './normal-distribution-control';

describe('NormalDistributionControl', () => {
  let component: NormalDistributionControl;
  let fixture: ComponentFixture<NormalDistributionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalDistributionControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalDistributionControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
