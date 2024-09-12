import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHubPageComponent } from './main-hub-page.component';

describe('MainHubPageComponent', () => {
  let component: MainHubPageComponent;
  let fixture: ComponentFixture<MainHubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHubPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
