import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-template-field-form',
  templateUrl: './template-field-form.component.html',
  styleUrls: ['./template-field-form.component.scss'],
})
export class TemplateFieldFormComponent {
  form = this.fb.group({
    id: [''],
    name: [''],
  });

  constructor(public dialogRef: DialogRef<string>, private fb: FormBuilder) {}

  close() {
    this.dialogRef.close();
  }

  save() {}
}
