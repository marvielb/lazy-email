import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './pages/send/send.component';

const routes: Routes = [{ path: 'send', component: SendComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
