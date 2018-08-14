import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { PaginationHelper } from '../shared/pagination-helper.model';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public paginationHelper: PaginationHelper<UserResponse>;

  constructor(private _userService: UserApiService, private titleService: Title) { }

  ngOnInit() {
    this.getUsers(1, 10);
    this.setTitle('List of users - ACWA');
  }

  public getUsers(page?: number, pageSize?: number): void {
    this._userService.GetUsers(page, pageSize)
      .subscribe(users => this.paginationHelper = users);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
