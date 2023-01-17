import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  filter,
  map,
  mergeMap,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.service';
import { Template } from '../template/template.model';
import { TemplateService } from '../template/template.service';
const Handlebars = require('handlebars/dist/cjs/handlebars');

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnDestroy {
  onDestroy$: Subject<void> = new Subject();
  templates$: Observable<Array<Template>> =
    this.templateService.templates$.pipe(
      map((t) => t.sort((t1, t2) => (t1.name < t2.name ? -1 : 1)))
    );
  selectedTemplateForm = this.fb.control('');
  selectedTemplateConfirmChanges$: Observable<boolean> =
    this.selectedTemplateForm.valueChanges.pipe(
      mergeMap(() =>
        this.sendForm.dirty == false
          ? of(true)
          : this.confirmDialog.open({
              title: 'Confirmation',
              content:
                'Are you sure you want to select another template? All unsaved changes will be lost!',
            })
      ),
      shareReplay(1)
    );

  selectedTemplate$: Observable<Template | undefined> =
    this.selectedTemplateConfirmChanges$.pipe(
      filter((confirmedChange) => confirmedChange === true),
      switchMap(() =>
        this.templateService.templates$.pipe(
          take(1),
          map((ts) => ts.find((t) => t.id == this.selectedTemplateForm.value))
        )
      ),
      shareReplay(1)
    );

  templateCompiler$: Observable<any> = this.selectedTemplate$.pipe(
    map((st) => Handlebars.compile(st?.body)),
    shareReplay(1)
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
    private fb: FormBuilder,
    public confirmDialog: ConfirmDialogService
  ) {
    this.selectedTemplateConfirmChanges$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((confirmed) => confirmed === false)
      )
      .subscribe(() => {
        this.selectedTemplate$.pipe(take(1)).subscribe((template) =>
          this.selectedTemplateForm.setValue(template!.id, {
            emitEvent: false,
          })
        );
      });

    this.selectedTemplate$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((template) => {
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
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSendClick() {
    const params = this.sendFormFields.controls
      .map((ff) => ff.value)
      .reduce((p, c) => {
        p[c.id] = c.value;
        return p;
      }, {});
    this.templateCompiler$
      .pipe(
        take(1),
        map((compiler) => compiler(params)),
        switchMap((compiled) =>
          this.confirmDialog
            .open({
              title: 'Are you sure you want to send the following?',
              content: compiled,
            })
            .pipe(
              filter((confirmed) => confirmed === true),
              map(() => compiled)
            )
        )
      )
      .subscribe((compiled) => {
        console.log(compiled);
      });
  }
}
