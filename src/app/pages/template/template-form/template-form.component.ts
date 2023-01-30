import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
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
export class TemplateFormComponent implements OnDestroy {
  selectedTemplate$: Observable<Template | undefined>;
  onDestroy$: Subject<void> = new Subject();
  name = this.templateFormService.form.get('name');

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    public templateFormService: TemplateFormService,
    private dialog: Dialog,
    public confirmDialog: ConfirmDialogService,
    private router: Router
  ) {
    this.selectedTemplate$ = combineLatest([
      this.route.paramMap,
      this.templateService.templates$,
    ]).pipe(
      map(([params, templates]): Template | undefined =>
        templates.find((t) => t.id == params.get('id'))
      ),
      shareReplay(1)
    );

    this.selectedTemplate$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((template) => template !== undefined)
      )
      .subscribe((template) => {
        this.templateFormService.setValue(template!);
      });

    this.selectedTemplate$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((template) => template === undefined),
        switchMap(() => this.templateService.templates$.pipe(take(1)))
      )
      .subscribe((templates) => {
        if (templates.length > 0) {
          this.router.navigate([templates[0].id], {
            relativeTo: this.route.parent,
          });
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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

  onDeleteTemplateClick(id: string) {
    this.confirmDialog
      .open({
        title: 'Confirmation',
        content: 'Are you sure you want to delete this template?',
      })
      .pipe(filter((c) => c == true))
      .subscribe(() => {
        this.templateService.deleteTemplate(id);
        this.templateFormService.form.markAsPristine();
      });
  }
}
