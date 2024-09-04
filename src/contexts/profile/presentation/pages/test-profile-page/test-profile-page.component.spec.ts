import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProfilePageComponent } from './test-profile-page.component';

describe('TestProfilePageComponent', () => {
  let component: TestProfilePageComponent;
  let fixture: ComponentFixture<TestProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
