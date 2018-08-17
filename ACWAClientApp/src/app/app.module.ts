import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { AddUserComponent } from './users/add-user/add-user.component';

import { UserApiService } from './users/shared/user-api.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PaginationComponent } from './extensions/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './extensions/modal-delete/modal-delete.component';

const appRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:page', component: UserListComponent },
  { path: 'user/:id/:returnUrl', component: UserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PaginationComponent,
    UserComponent,
    ModalDeleteComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    UserApiService,
    Title
  ],
  entryComponents: [
    ModalDeleteComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
