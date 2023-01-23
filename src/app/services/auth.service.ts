import { Injectable, NgZone } from '@angular/core';
import {
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  take,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _gapiClientLoaded$: ReplaySubject<void> = new ReplaySubject();

  private _tokenClient$: Observable<google.accounts.oauth2.TokenClient> =
    this._gapiClientLoaded$.pipe(
      map(() =>
        google.accounts.oauth2.initTokenClient({
          client_id: environment.googleClientId,
          scope: 'https://www.googleapis.com/auth/gmail.readonly',
          callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {
            console.log(tokenResponse);
          },
        })
      ),
      shareReplay(1)
    );

  public user$: Subject<any> = new Subject();
  public tokenClientLoaded$: Observable<boolean> = this._tokenClient$.pipe(
    map(() => true)
  );

  public login() {
    this._tokenClient$
      .pipe(take(1))
      .subscribe((tokenClient) =>
        tokenClient.requestAccessToken({ prompt: 'consent' })
      );
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
  }
}
