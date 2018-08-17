import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  constructor(
    private userService: UserApiService,
    private titleService: Title,
    private activateRoute: ActivatedRoute) {}

  private userId: string;
  public returnUrl: string;
  public user: UserResponse;

  ngOnInit() {
    this.activateRoute.params
      .subscribe(x => {
        this.userId = x['id'];
        this.returnUrl = x['returnUrl'];
    });
    this.getUser(this.userId);
    this.setTitle('About - ACWA');
  }

  getUser(id: string) {
    this.userService.GetUserById(id)
      .subscribe(x => this.user = x);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
