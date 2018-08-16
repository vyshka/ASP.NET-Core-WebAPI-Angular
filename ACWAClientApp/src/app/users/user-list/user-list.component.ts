import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { PaginationHelper } from '../shared/pagination-helper.model';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public paginationHelper: PaginationHelper<UserResponse>;
  public pageUrl = '/users';
  private pageSize = 20;
  private page = 1;

  constructor(private userService: UserApiService,
    private titleService: Title,
    private activateRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.activateRoute.params
      .subscribe(x => this.page = x['page']);
    this.getUsers(this.pageSize, this.page);
    this.setTitle('List of users - ACWA');
  }

  public getUsers(pageSize: number, page?: number): void {
    this.userService.GetUsers(page, pageSize)
      .subscribe(x => this.paginationHelper = x);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onClickRow(userId: number) {
    this.router.navigate(['/user', userId, '/users/' + this.paginationHelper.PageNumber]);
  }
}
