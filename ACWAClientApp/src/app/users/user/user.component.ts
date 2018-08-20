import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../shared/user-api.service';
import { UserResponse } from '../shared/user-response.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './../../extensions/modal-delete/modal-delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  constructor(private userService: UserApiService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) {}

  private userId: string;
  public returnUrl: string;
  public user: UserResponse;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(x => {
        this.userId = x['id'];
        this.returnUrl = x['returnUrl'];
    });
    this.getUser(this.userId);
    this.setTitle('About - ACWA');
  }

  public openDeleteModal(userId: string, userFullName: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.itemDescription = userFullName;
    modalRef.componentInstance.itemId = userId;
    modalRef.result.then(x => this.deleteUser(x));
  }

  private getUser(id: string) {
    this.userService.GetUserById(id)
      .subscribe(x => this.user = x);
  }

  private deleteUser(userId: string): void {
    if (userId != null && userId !== '') {
      this.userService.DeleteUser(userId);
      this.router.navigate([this.returnUrl]);
    }
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
