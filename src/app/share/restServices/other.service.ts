import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/:params1/:params2/:params3/:params4/:params5';

  // industry
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'industry',
      params2: 'getAll'
    },
    
  })
  industry(data: HttpData): Observable<any> {
    return data.observable;
  }
  // depart
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'depart',
      params2: 'getAllDepat'
    },
    
  })
  depart(data: HttpData): Observable<any> {
    return data.observable;
  }
  // subject
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'subject',
      params2: 'getAll'
    },
    
  })
  subject(data: HttpData): Observable<any> {
    return data.observable;
  }
  // getCode
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'sms',
      params2: 'getCode'
    },
    
  })
  getCode(data: HttpData): Observable<any> {
    return data.observable;
  }
}
