import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomModalModule, ModalComponent } from 'ya-custom-modal-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { NavbarComponent } from './layout/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TeamComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
