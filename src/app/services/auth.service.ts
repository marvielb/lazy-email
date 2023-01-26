import { Injectable, NgZone } from '@angular/core';
import {
  filter,
  iif,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _gapiClientLoaded$: ReplaySubject<void> = new ReplaySubject();
  private _loginToken$: ReplaySubject<google.accounts.oauth2.TokenResponse> =
    new ReplaySubject();
  private _logout$: ReplaySubject<void> = new ReplaySubject();

  private _tokenClient$: Observable<google.accounts.oauth2.TokenClient | null> =
    this._gapiClientLoaded$.pipe(
      map(() =>
        google.accounts.oauth2.initTokenClient({
          client_id: environment.googleClientId,
          scope: 'https://www.googleapis.com/auth/gmail.readonly',
          callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {
            this.ngZone.run(() => {
              this._loginToken$.next(tokenResponse);
            });
          },
        })
      ),
      startWith(null),
      shareReplay(1)
    );

  private _localStorageToken$: Observable<string> = of(
    localStorage.getItem('googleClientToken')
  ).pipe(
    filter((token) => token !== null),
    filter(
      () =>
        Number(localStorage.getItem('googleClientTokenExpiration')) >
        Math.floor(Date.now() / 1000)
    ), //Check if token is valid
    map((token) => token!),
    mergeMap((token) => this._gapiClientLoaded$.pipe(map(() => token))), //Ensure that gapi is initialized
    tap((token) => gapi.client.setToken({ access_token: token }))
  );

  public token$: Observable<string | null> = merge(
    this._loginToken$
      .asObservable()
      .pipe(map((loginToken) => loginToken.access_token)),
    this._localStorageToken$,
    this._logout$.pipe(map(() => null))
  ).pipe(shareReplay(1));

  public user$: Observable<User | null> = this.token$.pipe(
    //switchMap(() => from(gapi.client.gmail.users.getProfile({ userId: 'me' }))),
    switchMap(
      (
        token
      ): Observable<gapi.client.Response<gapi.client.gmail.Profile> | null> =>
        iif(
          () => token !== null,
          new Observable((observer) => {
            gapi.client.gmail.users
              .getProfile({ userId: 'me' })
              .then((response) => {
                this.ngZone.run(() => {
                  observer.next(response);
                  observer.complete();
                });
              });
          }),
          of(null)
        )
    ),
    map((profile): User | null => {
      if (profile !== null) {
        return { email: profile?.result.emailAddress! };
      }
      return null;
    }),
    shareReplay(1)
  );

  public tokenClientLoaded$: Observable<boolean> = this._tokenClient$.pipe(
    filter((token) => token !== null),
    map(() => true),
    startWith(false),
    shareReplay(1)
  );

  public login() {
    this._tokenClient$
      .pipe(
        take(1),
        filter((tokenClient) => tokenClient !== null)
      )
      .subscribe((tokenClient) =>
        tokenClient!.requestAccessToken({ prompt: 'consent' })
      );
  }

  public logout() {
    this._logout$.next();
  }

  constructor(private ngZone: NgZone) {
    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: environment.googleApiKey,
        discoveryDocs: [environment.gmailDiscoveryDoc],
      });
      this.ngZone.run(() => {
        this._gapiClientLoaded$.next();
      });
    });

    this._loginToken$.subscribe((loginToken) => {
      localStorage.setItem('googleClientToken', loginToken.access_token);
      localStorage.setItem(
        'googleClientTokenExpiration',
        Number(Math.floor(Date.now() / 1000) + loginToken.expires_in).toString()
      );
    });
    this._logout$.subscribe(() => {
      localStorage.removeItem('googleClientToken');
      localStorage.removeItem('googleClientTokenExpiration');
    });
    this.user$.subscribe(console.log);
  }
}
