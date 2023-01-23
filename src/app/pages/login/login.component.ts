import { ApplicationRef, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userToken$: Subject<string> = new Subject();
  btnEnabled$: Observable<boolean> = this.authService.tokenClientLoaded$;

  constructor(
    protected authService: AuthService,
    protected applicationRef: ApplicationRef
  ) {}

  onClick() {
    this.authService.login();
  }
}
