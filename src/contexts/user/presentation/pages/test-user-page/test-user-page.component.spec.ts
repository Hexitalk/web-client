import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserPageComponent } from './test-user-page.component';

describe('TestUserPageComponent', () => {
  let component: TestUserPageComponent;
  let fixture: ComponentFixture<TestUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
