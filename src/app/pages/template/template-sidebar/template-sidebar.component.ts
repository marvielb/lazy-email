import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SideBarService } from 'src/app/components/side-bar/side-bar.service';
import { Template } from '../template.model';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss'],
})
export class TemplateSidebarComponent {
  templates$: Observable<Array<Template>> =
    this.templateService.templates$.pipe(
      map((t) => t.sort((t1, t2) => (t1.name < t2.name ? -1 : 1)))
    );
  constructor(
    protected sideBarService: SideBarService,
    protected templateService: TemplateService
  ) {}
}
