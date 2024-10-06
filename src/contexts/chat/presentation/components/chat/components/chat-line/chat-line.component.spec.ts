import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLineComponent } from './chat-line.component';

describe('ChatLineComponent', () => {
  let component: ChatLineComponent;
  let fixture: ComponentFixture<ChatLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
