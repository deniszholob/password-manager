import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordWrapperComponent } from './password-wrapper.component';

describe('PasswordWrapperComponent', () => {
  let component: PasswordWrapperComponent;
  let fixture: ComponentFixture<PasswordWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
