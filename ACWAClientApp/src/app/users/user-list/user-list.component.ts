import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { PaginationHelper } from '../shared/pagination-helper.model';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public paginationHelper: PaginationHelper<UserResponse>;
  public pageUrl = '/users';
  private pageSize = 10;
  private page = 1;

  constructor(private _userService: UserApiService,
    private titleService: Title,
    private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => this.page = params['page']);
    this.getUsers(this.pageSize, this.page);
    this.setTitle('List of users - ACWA');
  }

  public getUsers(pageSize: number, page?: number): void {
    this._userService.GetUsers(page, pageSize)
      .subscribe(users => this.paginationHelper = users);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
