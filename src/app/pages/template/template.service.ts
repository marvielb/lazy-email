import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, take } from 'rxjs';
import { Template } from './template.model';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private _templates$: BehaviorSubject<Array<Template>>;
  public templates$: Observable<Array<Template>>;

  constructor() {
    const savedTemplates: Array<Template> = localStorage.getItem('templates')
      ? JSON.parse(localStorage.getItem('templates')!)
      : [];
    this._templates$ = new BehaviorSubject<Array<Template>>(savedTemplates);
    this.templates$ = this._templates$.asObservable().pipe(shareReplay(1));
    this.templates$.subscribe((template) =>
      localStorage.setItem('templates', JSON.stringify(template))
    );
  }

  updateTemplate(id: string, template: Template) {
    this.templates$
      .pipe(take(1))
      .subscribe((templates) =>
        this._templates$.next([
          ...templates.filter((t) => t.id != id),
          template,
        ])
      );
  }

  deleteTemplate(id: string) {
    this.templates$
      .pipe(take(1))
      .subscribe((templates) =>
        this._templates$.next(templates.filter((t) => t.id != id))
      );
  }

  addTemplate(): Template {
    const template: Template = {
      id: crypto.randomUUID(),
      name: '',
      defaultCC: '',
      defaultTo: '',
      fields: [],
      body: '',
    };
    this.templates$
      .pipe(take(1))
      .subscribe((templates) =>
        this._templates$.next([...templates, template])
      );
    return template;
  }
}
