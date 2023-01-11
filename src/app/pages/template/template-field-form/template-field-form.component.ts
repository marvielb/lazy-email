import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TemplateFormService } from '../template-form.service';

@Component({
  selector: 'app-template-field-form',
  templateUrl: './template-field-form.component.html',
  styleUrls: ['./template-field-form.component.scss'],
})
export class TemplateFieldFormComponent {
  form = this.fb.group({
    id: [
      '',
      [
        Validators.required,
        this.uniqueIDValidator(this.formService.formFields),
      ],
    ],
    name: ['', [Validators.required]],
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
    private formService: TemplateFormService
  ) {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.formService.formFields.push(this.form);
    this.formService.form.markAsDirty();
    this.dialogRef.close();
  }

  uniqueIDValidator(fields: FormArray): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const unique = fields.controls.some(
        (c) => c.get('id')!.value == control.value
      );
      return unique ? { uniqueID: { value: control.value } } : null;
    };
  }
}
