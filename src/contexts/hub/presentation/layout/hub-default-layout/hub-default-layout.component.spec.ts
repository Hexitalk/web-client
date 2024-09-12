import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDefaultLayoutComponent } from './hub-default-layout.component';

describe('HubDefaultLayoutComponent', () => {
  let component: HubDefaultLayoutComponent;
  let fixture: ComponentFixture<HubDefaultLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubDefaultLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubDefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
