import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SendComponent } from './send.component';

@Injectable({
  providedIn: 'root',
})
export class SendUnsavedGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: SendComponent,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.sendForm.dirty === false) {
      return true;
    }
    return component.confirmDialog.open({
      title: 'Confirmation',
      content:
        'Are you sure you want to leave? All unsaved changes will be lost!',
    });
  }
}
