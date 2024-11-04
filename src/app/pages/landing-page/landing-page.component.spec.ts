import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { TranslocoService } from '@jsverse/transloco';
import { ActivatedRoute } from '@angular/router';
import {
  mockActivatedRoute,
  mockTranslocoService,
} from '../../../testing/mock-services';
import { LiveAnnouncer } from '@angular/cdk/a11y';

fdescribe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let liveAnnouncerSpy: jasmine.SpyObj<LiveAnnouncer>;

  beforeEach(async () => {
    liveAnnouncerSpy = jasmine.createSpyObj('LiveAnnouncer', ['announce']);

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        { provide: TranslocoService, useValue: mockTranslocoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LiveAnnouncer, useValue: liveAnnouncerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should announce message', () => {
    const message = 'Contenido actualizado.';
    component.announceMessage();
    expect(liveAnnouncerSpy.announce).toHaveBeenCalledWith(message);
  });

  it('should have correct aria-label', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.getAttribute('aria-label')).toBe('Landing page');
  });
});
