import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ListenHubUpdateUseCase } from '../../../use-cases/listen-hub-update.usecase';
import { HubDataModule } from '../../../data/hub-data.module';
import { PanelHubItemComponent } from '../panel-hub-item/panel-hub-item.component';
import { HubModel } from '../../../domain/models/hub.model';
import { GetHubUseCase } from '../../../use-cases/get-hub.usecase';
import { merge } from 'rxjs';

@Component({
  selector: 'app-panel-hub',
  standalone: true,
  imports: [HubDataModule, PanelHubItemComponent],
  templateUrl: './panel-hub.component.html',
  styleUrl: './panel-hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelHubComponent implements OnInit {
  hub: WritableSignal<HubModel | undefined> = signal<HubModel | undefined>(
    undefined
  );

  constructor(
    private listenHubUpdateUseCase: ListenHubUpdateUseCase,
    private getHubUseCase: GetHubUseCase
  ) {}

  ngOnInit(): void {
    merge(
      this.getHubUseCase.execute(),
      this.listenHubUpdateUseCase.execute()
    ).subscribe((res) => {
      this.hub.set(res);
    });

    // this.getHubUseCase.execute().subscribe((e) => {
    //   this.hub.set(e);
    // });

    // this.listenHubUpdateUseCase.execute().subscribe((res) => {
    //   this.hub.set(res);
    // });

    // this.getHubUseCase
    //   .execute()
    //   .pipe(
    //     mergeAll(() => this.listenHubUpdateUseCase.execute()),
    //     tap(() => {
    //       console.log('tap');
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log('socket listen hub update a ', res);
    //     this.hub.set(res);
    //   });

    // this.getHubUseCase
    //   .execute()
    //   .pipe(
    //     mergeMap((hubData) => {
    //       console.log('Hub data received:', hubData);
    //       return this.listenHubUpdateUseCase.execute().pipe(
    //         tap((update) => {
    //           console.log('Hub update received:', update);
    //         })
    //       );
    //     }),
    //     tap(() => {
    //       console.log('tap after listenHubUpdateUseCase');
    //     })
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log('socket listen hub update a', res);
    //       this.hub.set(res);
    //     },
    //     error: (err) => {
    //       console.error('Error in observable chain:', err);
    //     },
    //   });

    // this.listenHubUpdateUseCase.execute().subscribe((res) => {
    //   console.log('socket listen hub update a ', res);
    //   this.hub.set(res);
    // });
  }
}
