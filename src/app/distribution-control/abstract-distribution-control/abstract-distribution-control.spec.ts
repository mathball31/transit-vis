import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractDistributionControl } from './abstract-distribution-control';

describe('AbstractDistributionControl', () => {
  let component: AbstractDistributionControl;
  let fixture: ComponentFixture<AbstractDistributionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractDistributionControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractDistributionControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
