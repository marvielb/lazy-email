import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { Template } from '../template/template.model';
import { TemplateService } from '../template/template.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent {
  templates$: Observable<Array<Template>> =
    this.templateService.templates$.pipe(
      map((t) => t.sort((t1, t2) => (t1.name < t2.name ? -1 : 1)))
    );
  selectedTemplateForm = this.fb.control('');
  selectedTemplate$: Observable<Template | undefined> =
    this.selectedTemplateForm.valueChanges.pipe(
      switchMap((v) =>
        this.templateService.templates$.pipe(
          take(1),
          map((ts) => ts.find((t) => t.id == v))
        )
      ),
      tap((template) => {
        this.sendFormFields.clear();
        this.sendForm.reset();
        template!.fields
          .map((f) =>
            this.fb.group({ id: [f.id], name: [f.name], value: [''] })
          )
          .forEach((c) => this.sendFormFields.push(c));

        this.sendForm.setValue({
          to: template!.defaultTo,
          cc: template!.defaultCC,
          fields: template!.fields.map((f) => ({ ...f, value: '' })),
        });
      })
    );

  sendForm = this.fb.group({
    to: ['', Validators.required],
    cc: [''],
    fields: this.fb.array([]),
  });

  get sendFormFields() {
    return this.sendForm.get('fields') as FormArray;
  }

  constructor(
    protected templateService: TemplateService,
    private fb: FormBuilder
  ) {}
}
