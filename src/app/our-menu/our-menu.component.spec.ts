import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMenuComponent } from './our-menu.component';

describe('OurMenuComponent', () => {
  let component: OurMenuComponent;
  let fixture: ComponentFixture<OurMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
