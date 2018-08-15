import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserApiService } from './users/shared/user-api.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './extensions/pagination/pagination.component';

const appRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:page', component: UserListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    )
  ],
  providers: [
    UserApiService,
    Title
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
