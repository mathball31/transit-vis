import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadProtoApp } from './road-proto-app';

describe('RoadProtoApp', () => {
  let component: RoadProtoApp;
  let fixture: ComponentFixture<RoadProtoApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadProtoApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadProtoApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
