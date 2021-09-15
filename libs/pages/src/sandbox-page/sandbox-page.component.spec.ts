import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxPageComponent } from './sandbox-page.component';
import { SandboxPageModule } from './sandbox-page.module';

describe('SandboxPageComponent', () => {
  let component: SandboxPageComponent;
  let fixture: ComponentFixture<SandboxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandboxPageModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
