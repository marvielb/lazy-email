import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { ConfirmDialogConfig } from './confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ConfirmDialogConfig
  ) {}

  closeClick() {
    this.dialogRef.close();
  }

  yesClick() {
    this.dialogRef.close('yes');
  }
}
