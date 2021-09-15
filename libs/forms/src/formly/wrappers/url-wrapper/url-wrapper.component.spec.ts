import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlWrapperComponent } from './url-wrapper.component';

describe('UrlWrapperComponent', () => {
  let component: UrlWrapperComponent;
  let fixture: ComponentFixture<UrlWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
