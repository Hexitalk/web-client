import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFriendPageComponent } from './test-friend-page.component';

describe('TestFriendPageComponent', () => {
  let component: TestFriendPageComponent;
  let fixture: ComponentFixture<TestFriendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFriendPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFriendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
