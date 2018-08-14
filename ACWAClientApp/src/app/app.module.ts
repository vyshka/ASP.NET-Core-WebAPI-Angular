import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserApiService } from './users/shared/user-api.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    UserApiService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
