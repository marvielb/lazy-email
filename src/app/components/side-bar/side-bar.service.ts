import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, shareReplay, take } from 'rxjs';
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
    this.$shouldShow.pipe(take(1)).subscribe((v) => this.$show.next(!v));
  }
}
