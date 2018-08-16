import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';

import { UserApiService } from './users/shared/user-api.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PaginationComponent } from './extensions/pagination/pagination.component';

const appRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:page', component: UserListComponent },
  { path: 'user/:id/:returnUrl', component: UserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PaginationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserApiService,
    Title
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
