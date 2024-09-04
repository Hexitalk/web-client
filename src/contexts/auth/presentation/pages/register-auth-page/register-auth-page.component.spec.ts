import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAuthPageComponent } from './register-auth-page.component';

describe('RegisterAuthPageComponent', () => {
  let component: RegisterAuthPageComponent;
  let fixture: ComponentFixture<RegisterAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAuthPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
