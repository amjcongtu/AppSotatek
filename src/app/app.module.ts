import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SotatekService } from "src/service/app.service";
import { TaskModule } from './task/task.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducer/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppReducer } from './store/app.state';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(AppReducer),
    FormsModule,
    ReactiveFormsModule,
    ToastNotificationsModule,
    TaskModule,
    StoreDevtoolsModule.instrument({
      maxAge: 99,
      logOnly: environment.production
    }),
  ],
  providers: [SotatekService],
  bootstrap: [AppComponent]
})
export class AppModule { }
