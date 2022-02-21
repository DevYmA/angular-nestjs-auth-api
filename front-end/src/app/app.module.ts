import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomModalModule, ModalComponent } from 'ya-custom-modal-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
