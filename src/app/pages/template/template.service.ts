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
    if (savedTemplates.length == 0) {
      this._templates$.next([
        {
          id: '1',
          name: 'Request for Connection',
          defaultTo: 'it@example.com',
          defaultCC: '',
          fields: [{ id: 'date_today', name: 'Date Today' }],
          body: 'Hi, programmers department would like to request for a connection on {{ date_today }} for enhancements',
        },
        {
          id: '2',
          name: 'Request for Backup',
          defaultTo: 'it2@example.com',
          defaultCC: '',
          fields: [
            { id: 'date_today', name: 'Date Today' },
            { id: 'database_name', name: 'Database Name' },
          ],
          body: 'Hi, programmers department would like to request for a backup on {{ date_today }} with the database name: {{ database_name }}',
        },
      ]);
    }
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
