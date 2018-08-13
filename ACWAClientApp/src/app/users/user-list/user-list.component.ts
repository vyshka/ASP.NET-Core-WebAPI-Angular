import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { PaginationHelper } from '../shared/pagination-helper.model';
import { UserResponse } from '../shared/user-response.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  paginationHelper: PaginationHelper<UserResponse>;

  constructor(public _userService: UserApiService) { }
  ngOnInit() {

    const a = this._userService.GetUsers();

    this._userService.GetUsers()
      .subscribe(data => this.paginationHelper = data);
  }

}
