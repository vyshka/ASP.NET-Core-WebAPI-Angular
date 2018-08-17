import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from './../shared/user-api.service';
import { User } from './../shared/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  constructor(private userService: UserApiService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public showAllErrors = false;
  private userId: string;
  public user: User;

  userForm = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64)
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64)
    ]),
    Login: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32)
    ]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(32)
    ])
  });

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(x => this.userId = x['id']);
    if (this.userId != null && this.userId !== '') {
      this.getUser(this.userId);
    }
    this.setTitle('Adding a new user - ACWA');
  }

  public onSubmitUserForm(): void {
    if (!this.userForm.invalid) {
      this.userForm.value['PhoneNumber'] = '+375 ' + this.userForm.value['PhoneNumber'];
      this.userService.AddUser(this.userForm.value);
      this.router.navigate(['/users']);
    } else {
      this.showAllErrors = true;
    }
  }

  private getUser(id: string): void {
    this.userService.GetUserForEditById(id)
      .subscribe(x => this.user = x);

    console.log(this.user);
    if (this.user != null) {
      this.FillFormForEdit();
    }
  }

  // this.user.Id = x.Id;
  // this.user.FirstName = x.FirstName;
  // this.user.LastName = x.LastName;
  // this.user.Login = x.Login;
  // this.user.PhoneNumber = x.PhoneNumber;

  private FillFormForEdit(): void {
    this.userForm.setValue({
      FirstName: this.user.FirstName,
      LastName: this.user.LastName,
      Login: this.user.Login,
      PhoneNumber: this.user.PhoneNumber.substring(4) // Removing '+375'
    });

  }

  private setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
