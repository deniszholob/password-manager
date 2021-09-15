import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMultiSelectComponent } from './open-multi-select.component';

describe('OpenMultiSelectComponent', () => {
  let component: OpenMultiSelectComponent;
  let fixture: ComponentFixture<OpenMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
