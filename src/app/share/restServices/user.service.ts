import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/:params1/:params2/:params3/:params4/:params5';

  // login
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'auth',
      params2: 'login'
    },
    roles: [],
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  })
  login(data: HttpData): Observable<any> {
    return data.observable;
  }

  // add
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'user',
      params2: 'addUser'
    },
  })
  add(data: HttpData): Observable<any> {
    return data.observable;
  }

  // updateUser
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'user',
      params2: 'updateUser'
    },
    roles: []
  })
  updateUser(data: HttpData): Observable<any> {
    return data.observable;
  }

  // getAllUser
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'user',
      params2: 'getAllUser'
    },
    roles: []
  })
  getAllUser(data: HttpData): Observable<any> {
    return data.observable;
  }

  // getById
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'user',
      params2: 'getById'
    },
    roles: []
  })
  getById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // disable
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'user',
      params2: 'disable',
    },
    roles: []
  })
  disable(data: HttpData): Observable<any> {
    return data.observable;
  }
// able
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'user',
      params2: 'able'
    },
    roles: []
  })
  able(data: HttpData): Observable<any> {
    return data.observable;
  }
  // updatePassword
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'user',
      params2: 'updatePassword'
    },
    roles: []
  })
  updatePassword(data: HttpData): Observable<any> {
    return data.observable;
  }

  


}
