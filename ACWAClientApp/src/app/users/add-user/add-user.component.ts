import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from './../shared/user-api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  constructor(private userService: UserApiService,
    private titleService: Title,
    private router: Router) { }

  public showAllErrors = false;

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

  private setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
