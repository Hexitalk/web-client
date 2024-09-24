import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHubItemComponent } from './panel-hub-item.component';

describe('PanelHubItemComponent', () => {
  let component: PanelHubItemComponent;
  let fixture: ComponentFixture<PanelHubItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHubItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelHubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
