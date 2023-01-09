import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Template } from './template.model';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private _templates$: BehaviorSubject<Array<Template>>;
  public templates$: Observable<Array<Template>>;

  constructor() {
    this._templates$ = new BehaviorSubject<Array<Template>>([]);
    this.templates$ = this._templates$.asObservable().pipe(shareReplay(1));
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
}
