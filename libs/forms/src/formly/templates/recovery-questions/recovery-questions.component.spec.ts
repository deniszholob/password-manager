import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryQuestionsComponent } from './recovery-questions.component';

describe('RecoveryQuestionsComponent', () => {
  let component: RecoveryQuestionsComponent;
  let fixture: ComponentFixture<RecoveryQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
