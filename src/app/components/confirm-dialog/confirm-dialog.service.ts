import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export interface ConfirmDialogConfig {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: Dialog) {}

  open(config: ConfirmDialogConfig): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        data: config,
        height: 'auto',
        width: 'auto',
      })
      .closed.pipe(map((r): boolean => (r === 'yes' ? true : false)));
  }
}
