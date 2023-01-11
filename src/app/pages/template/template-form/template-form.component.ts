import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Field } from '../field.model';
import { TemplateFieldFormComponent } from '../template-field-form/template-field-form.component';
import { Template } from '../template.model';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
  selectedTemplate$: Observable<Template | undefined>;
  reload$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private fb: FormBuilder,
    private dialog: Dialog
  ) {
    this.selectedTemplate$ = combineLatest([
      this.route.paramMap,
      this.reload$,
    ]).pipe(
      map(([params, _reload]) => params),
      map((params) => params.get('id')),
      switchMap((id) =>
        this.templateService.templates$.pipe(
          take(1),
          map((templates) => templates.find((t) => t.id == id))
        )
      ),
      tap((template) => {
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
      }),
      shareReplay(1)
    );
  }

  updateTemplate(id: string) {
    const formValue = this.form.value;
    this.templateService.updateTemplate(id, {
      id: id,
      name: formValue ? formValue.name! : '',
      defaultTo: formValue ? formValue.defaultTo! : '',
      defaultCC: formValue ? formValue.defaultCC! : '',
      body: formValue ? formValue.body! : '',
      fields: this.formFields.controls.map((c): Field => {
        const val = c.value;
        return {
          id: val.id,
          name: val.name,
        };
      }),
    });
    this.reload$.next(null);
  }

  onAddFieldClick() {
    this.dialog.open(TemplateFieldFormComponent);
  }
}
