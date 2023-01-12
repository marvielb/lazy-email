import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.service';
import { Field } from '../field.model';
import { TemplateFieldFormComponent } from '../template-field-form/template-field-form.component';
import { TemplateFormService } from '../template-form.service';
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

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    protected templateFormService: TemplateFormService,
    private dialog: Dialog,
    private confirmDialog: ConfirmDialogService
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
        this.templateFormService.setValue(template!);
      }),
      shareReplay(1)
    );
  }

  updateTemplate(id: string) {
    const formValue = this.templateFormService.value;
    this.templateService.updateTemplate(id, {
      id: id,
      name: formValue ? formValue.name! : '',
      defaultTo: formValue ? formValue.defaultTo! : '',
      defaultCC: formValue ? formValue.defaultCC! : '',
      body: formValue ? formValue.body! : '',
      fields: this.templateFormService.formFields.controls.map((c): Field => {
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

  onEditFieldClick(i: number, field: Field) {
    this.dialog.open(TemplateFieldFormComponent, { data: { index: i, field } });
  }

  onDeleteFieldClick(i: number) {
    this.confirmDialog
      .open({
        title: 'Confirmation',
        content: 'Are you sure you want to delete?',
      })
      .pipe(filter((c) => c == true))
      .subscribe(() => {
        this.templateFormService.formFields.removeAt(i);
        this.templateFormService.form.markAsDirty();
      });
  }
}
