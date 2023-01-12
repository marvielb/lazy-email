import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SendComponent } from './pages/send/send.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarToggleComponent } from './components/side-bar/side-bar-toggle/side-bar-toggle.component';
import { TemplateSidebarComponent } from './pages/template/template-sidebar/template-sidebar.component';
import { TemplateFormComponent } from './pages/template/template-form/template-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { TemplateFieldFormComponent } from './pages/template/template-field-form/template-field-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SendComponent,
    SideBarComponent,
    SideBarToggleComponent,
    TemplateSidebarComponent,
    TemplateFormComponent,
    TemplateFieldFormComponent,
    ConfirmDialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, DialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
