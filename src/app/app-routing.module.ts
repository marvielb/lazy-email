import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './pages/send/send.component';
import { TemplateFormComponent } from './pages/template/template-form/template-form.component';
import { TemplateSidebarComponent } from './pages/template/template-sidebar/template-sidebar.component';

const routes: Routes = [
  { path: 'send', component: SendComponent },
  {
    path: 'template',
    component: TemplateSidebarComponent,
    children: [{ path: ':id', component: TemplateFormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
