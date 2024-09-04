import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormAuthComponent } from './register-form-auth.component';

describe('RegisterFormAuthComponent', () => {
  let component: RegisterFormAuthComponent;
  let fixture: ComponentFixture<RegisterFormAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
