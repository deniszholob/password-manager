import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickToCopyComponent } from './click-to-copy.component';

describe('ClickToCopyComponent', () => {
  let component: ClickToCopyComponent;
  let fixture: ComponentFixture<ClickToCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickToCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickToCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
