import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { Template } from '../template.model';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
  selectedTemplate$: Observable<Template | undefined>;
  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService
  ) {
    this.selectedTemplate$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) =>
        this.templateService.templates$.pipe(
          take(1),
          map((templates) => templates.find((t) => t.id == id))
        )
      ),
      shareReplay(1)
    );
  }
}
