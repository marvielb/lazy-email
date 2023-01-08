import { Component } from '@angular/core';
import { SideBarService } from 'src/app/components/side-bar/side-bar.service';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.scss'],
})
export class TemplateSidebarComponent {
  constructor(
    protected sideBarService: SideBarService,
    protected templateService: TemplateService
  ) {}
}
