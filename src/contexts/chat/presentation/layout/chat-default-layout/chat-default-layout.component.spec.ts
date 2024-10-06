import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDefaultLayoutComponent } from './chat-default-layout.component';

describe('ChatDefaultLayoutComponent', () => {
  let component: ChatDefaultLayoutComponent;
  let fixture: ComponentFixture<ChatDefaultLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDefaultLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
