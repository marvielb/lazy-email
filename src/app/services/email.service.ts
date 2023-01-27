import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from './auth.service';

export interface EmailRequest {
  subject: string;
  to: string;
  cc: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private authService: AuthService) {}

  public sendEmail(request: EmailRequest) {
    this.authService.token$.pipe(take(1)).subscribe(() => {
      const mimeData = [
        `To: ${request.to}`,
        'Subject: =?utf-8?B?' + window.btoa(request.subject) + '?=',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 7bit',
        '',
        request.body,
      ]
        .join('\n')
        .trim();
      const raw = window.btoa(mimeData);
      gapi.client.gmail.users.messages
        .send({
          userId: 'me',
          resource: {
            raw: raw,
          },
        })
        .execute(() => {});
    });
  }
}
