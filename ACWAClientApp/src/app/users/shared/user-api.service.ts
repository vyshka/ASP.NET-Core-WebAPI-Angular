import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationHelper } from './pagination-helper.model';
import { UserResponse } from './user-response.model';
import { AddUserRequest } from './add-user-request.model';
import { User } from './user.model';
import { UpdateUserRequest } from './update-user-request.model';

@Injectable()
export class UserApiService {
  constructor(private http: Http) { }

  public GetUserById(id: string): Observable<UserResponse> {
    return this.http.get('/api/users/' + id).pipe(
      map((data: Response) => {
        return data.json() as UserResponse;
      })
    );
  }

  public GetUserForEditById(id: string): Observable<User> {
    return this.http.get('/api/users/full/' + id).pipe(
      map((data: Response) => {
        return data.json() as User;
      })
    );
  }

  public GetUsers (page?: number, pageSize?: number): Observable<PaginationHelper<UserResponse>> {
    let parameters: string;
    if (page != null && pageSize != null) {
      parameters = '?page=' + page + '&pagesize=' + pageSize;
    } else if (page != null && pageSize == null) {
      parameters = '?page=' + page;
    } else if (page == null && pageSize != null) {
      parameters = '?pagesize=' + pageSize;
    } else {
      parameters = '';
    }

    return this.http.get('/api/users' + parameters).pipe(
      map((data: Response) => {
        return data.json() as PaginationHelper<UserResponse>;
      })
    );
  }

  public DeleteUser(id: string): void {
    this.http.delete('/api/users/' + id)
      .subscribe(() => {});
  }

  public AddUser(model: AddUserRequest): void {
    this.http.post('/api/users/add', model)
      .subscribe(() => {});
  }

  public UpdateUser(model: UpdateUserRequest): void {
    this.http.put('/api/users/update', model)
      .subscribe(() => {});
  }
}
