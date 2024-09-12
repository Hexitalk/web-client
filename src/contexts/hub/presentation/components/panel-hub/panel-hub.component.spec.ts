import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHubComponent } from './panel-hub.component';

describe('PanelHubComponent', () => {
  let component: PanelHubComponent;
  let fixture: ComponentFixture<PanelHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
