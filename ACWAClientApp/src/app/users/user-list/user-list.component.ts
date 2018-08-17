import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { PaginationHelper } from '../shared/pagination-helper.model';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './../../extensions/modal-delete/modal-delete.component';

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
    private router: Router,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.activateRoute.params
      .subscribe(x => this.page = x['page']);
    this.getUsers(this.pageSize, this.page);
    this.setTitle('List of users - ACWA');
  }

  public onClickRow(userId: number): void {
    this.router.navigate(['/user', userId, '/users/' + this.paginationHelper.PageNumber]);
  }

  public openDeleteModal(userId: string, userFullName: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.itemDescription = userFullName;
    modalRef.componentInstance.itemId = userId;
    modalRef.result.then(x => this.deleteUser(x));
  }

  private getUsers(pageSize: number, page?: number): void {
    this.userService.GetUsers(page, pageSize)
      .subscribe(x => this.paginationHelper = x);
  }

  private setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  private deleteUser(userId: string): void {
    if (userId != null && userId !== '') {
      this.userService.DeleteUser(userId);
      location.reload();
    }
  }
}
