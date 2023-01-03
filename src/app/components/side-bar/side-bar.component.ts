import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SideBarIcon } from './side-bar-icon.model';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  $shouldShow: Observable<boolean>;

  constructor(protected service: SideBarService) {
    this.$shouldShow = this.service.$shouldShow;
  }

  icons: Array<SideBarIcon> = [
    {
      svgPath:
        'M4.4 19.425q-.5.2-.95-.088Q3 19.05 3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35q-.2-.275-.2-.625V5.5q0-.55.45-.838q.45-.287.95-.087l15.4 6.5q.625.275.625.925t-.625.925Z',
      viewBox: '0 0 24 24',
      urlPath: '/send',
      tooltip: 'Send',
    },
    {
      svgPath:
        'M4.5 2A2.5 2.5 0 0 0 2 4.5v6A2.5 2.5 0 0 0 4.5 13H5V9.5A2.5 2.5 0 0 1 7.5 7H13V4.5A2.5 2.5 0 0 0 10.5 2h-6Zm0 2.5A.5.5 0 0 1 5 4h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5Zm1.502 4.929A1.5 1.5 0 0 1 7.5 8h6a1.5 1.5 0 0 1 1.498 1.429L10.5 11.928l-4.498-2.5Zm4.74 3.508L15 10.572V13.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 6 13.5v-2.928l4.257 2.365a.5.5 0 0 0 .486 0Z',
      viewBox: '0 0 16 16',
      urlPath: '/template',
      tooltip: 'Template',
    },
  ];
}
