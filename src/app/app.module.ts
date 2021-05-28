import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEditComponent } from './edit/app-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SotatekService } from "src/service/app.service";

@NgModule({
  declarations: [
    AppComponent,AppEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNotificationsModule
  ],
  providers: [SotatekService],
  bootstrap: [AppComponent,AppEditComponent]
})
export class AppModule { }
