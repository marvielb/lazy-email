import { Component } from '@angular/core';
import { SideBarService } from '../side-bar.service';

@Component({
  selector: 'app-side-bar-toggle',
  templateUrl: './side-bar-toggle.component.html',
  styleUrls: ['./side-bar-toggle.component.scss'],
})
export class SideBarToggleComponent {
  constructor(protected sidebarService: SideBarService) {}

  toggleClick() {
    this.sidebarService.toggle();
  }
}
