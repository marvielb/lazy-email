import { ApplicationRef, Component } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userToken$: Subject<string> = new Subject();
  btnEnabled$: Observable<boolean> = this.authService.tokenClientLoaded$;

  loggedInShow$: Observable<boolean> = this.authService.token$.pipe(
    map((token) => (token === null ? false : true))
  );

  constructor(
    protected authService: AuthService,
    protected applicationRef: ApplicationRef
  ) {}

  onLoginClick() {
    this.authService.login();
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
