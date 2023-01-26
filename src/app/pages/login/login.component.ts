import { Component } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.service';
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
    private confirmDialogService: ConfirmDialogService
  ) {}

  onLoginClick() {
    this.authService.login();
  }

  onLogoutClick() {
    this.confirmDialogService
      .open({
        title: 'Confirmation',
        content: 'Are you sure you want to logout?',
      })
      .pipe(filter((c) => c === true))
      .subscribe(() => {
        this.authService.logout();
      });
  }
}
