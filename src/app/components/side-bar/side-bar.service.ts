import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { media } from 'src/app/utilities/media';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  private $show: BehaviorSubject<boolean>;
  public $shouldShow: Observable<boolean>;

  constructor() {
    this.$show = new BehaviorSubject<boolean>(true);
    this.$shouldShow = merge(
      this.$show.asObservable(),
      media('(min-width: 1024px)')
    ).pipe(shareReplay(1));
  }

  public toggle() {
    combineLatest([this.$shouldShow, media('(min-width: 1024px)')])
      .pipe(take(1))
      .subscribe(([shouldShow, matched]) => {
        if (!matched) {
          this.$show.next(!shouldShow);
        }
      });
  }
}
