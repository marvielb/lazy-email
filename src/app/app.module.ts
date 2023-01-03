import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SendComponent } from './pages/send/send.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarToggleComponent } from './components/side-bar/side-bar-toggle/side-bar-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    SendComponent,
    SideBarComponent,
    SideBarToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
