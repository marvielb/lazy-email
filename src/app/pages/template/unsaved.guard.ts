import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateFormComponent } from './template-form/template-form.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: TemplateFormComponent,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.templateFormService.form.dirty == false) {
      return true;
    }
    return component.confirmDialog.open({
      title: 'Confirmation',
      content: 'All unsaved changes will be lost!',
    });
  }
}
