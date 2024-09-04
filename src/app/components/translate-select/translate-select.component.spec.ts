import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSelectComponent } from './translate-select.component';

describe('TranslateSelectComponent', () => {
  let component: TranslateSelectComponent;
  let fixture: ComponentFixture<TranslateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
