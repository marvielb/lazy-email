import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Template } from './template.model';

@Injectable({
  providedIn: 'root',
})
export class TemplateFormService {
  form = this.fb.group({
    name: [''],
    defaultTo: [''],
    defaultCC: [''],
    fields: this.fb.array([]),
    body: [''],
  });

  get formFields() {
    return this.form.get('fields') as FormArray;
  }

  get value() {
    return this.form.value;
  }

  setValue(template: Template) {
    this.formFields.clear();
    this.form.reset();
    template!.fields
      .map((f) => this.fb.group({ id: [f.id], name: [f.name] }))
      .forEach((c) => this.formFields.push(c));

    this.form.setValue({
      name: template!.name,
      defaultTo: template!.defaultTo,
      defaultCC: template!.defaultCC,
      body: template!.body,
      fields: template!.fields,
    });
  }

  constructor(private fb: FormBuilder) {}
}
