import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.service';
import { TemplateFormService } from '../template-form.service';

@Component({
  selector: 'app-template-field-form',
  templateUrl: './template-field-form.component.html',
  styleUrls: ['./template-field-form.component.scss'],
})
export class TemplateFieldFormComponent {
  form = this.fb.group({
    id: [
      this.data ? this.data.field.id : '',
      [
        Validators.required,
        this.uniqueIDValidator(
          this.data ? this.data.index : null,
          this.formService.formFields
        ),
      ],
    ],
    name: [this.data ? this.data.field.name : '', [Validators.required]],
  });

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  constructor(
    public dialogRef: DialogRef<string>,
    private fb: FormBuilder,
    private formService: TemplateFormService,
    @Inject(DIALOG_DATA) public data: any,
    private confirmDialogService: ConfirmDialogService
  ) {}

  close() {
    if (this.form.dirty == false) {
      this.dialogRef.close();
    } else {
      this.confirmDialogService
        .open({
          title: 'Confirmation',
          content: 'All of the unsaved changes will be lost, continue?',
        })
        .pipe(filter((c) => c == true))
        .subscribe(() => this.dialogRef.close());
    }
  }

  save() {
    if (this.data) {
      const fieldForm = this.formService.formFields.at(this.data.index);
      fieldForm.setValue(this.form.value);
      this.formService.form.markAsDirty();
      this.dialogRef.close();
    } else {
      this.formService.formFields.push(this.form);
      this.formService.form.markAsDirty();
      this.dialogRef.close();
    }
  }

  uniqueIDValidator(excludedIndex: number, fields: FormArray): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const notUnique = fields.controls
        .filter((_, i) => i != excludedIndex)
        .some((c) => c.get('id')!.value == control.value);
      return notUnique ? { uniqueID: { value: control.value } } : null;
    };
  }
}
