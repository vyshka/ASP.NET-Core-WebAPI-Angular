import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationHelper } from './pagination-helper.model';
import { UserResponse } from './user-response.model';

@Injectable()
export class UserApiService {
  constructor(private http: Http) { }

  GetUserById(id: string): Observable<UserResponse> {
    return this.http.get('/api/users/' + id).pipe(
      map((data: Response) => {
        return data.json() as UserResponse;
      })
    );
  }

  GetUsers (page?: number, pageSize?: number): Observable<PaginationHelper<UserResponse>> {
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
}
