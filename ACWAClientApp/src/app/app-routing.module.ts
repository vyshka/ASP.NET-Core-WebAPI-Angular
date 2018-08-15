import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  // { path: '**', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users/:page', component: UserListComponent },
  { path: 'lol/kek', component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
