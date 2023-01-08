import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
  templateID$: Observable<number>;
  constructor(private route: ActivatedRoute) {
    this.templateID$ = this.route.paramMap.pipe(
      map((params): number => Number(params.get('id')!))
    );
  }
}
