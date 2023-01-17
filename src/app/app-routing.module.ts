import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendUnsavedGuard } from './pages/send/send-unsaved.guard';
import { SendComponent } from './pages/send/send.component';
import { TemplateFormComponent } from './pages/template/template-form/template-form.component';
import { TemplateSidebarComponent } from './pages/template/template-sidebar/template-sidebar.component';
import { UnsavedGuard } from './pages/template/unsaved.guard';

const routes: Routes = [
  { path: 'send', component: SendComponent, canDeactivate: [SendUnsavedGuard] },
  {
    path: 'template',
    component: TemplateSidebarComponent,
    children: [
      {
        path: ':id',
        component: TemplateFormComponent,
        canDeactivate: [UnsavedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
