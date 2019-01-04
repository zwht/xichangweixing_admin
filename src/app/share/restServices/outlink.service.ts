import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutlinkService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/link/:params1/:params2/:params3/:params4/:params5';

  // addOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'addLink'
    },
    
  })
  addAndUpdate(data: HttpData): Observable<any> {
    return data.observable;
  }
  // update
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'update'
    },
    
  })
  update(data: HttpData): Observable<any> {
    return data.observable;
  }
  // list
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getLinked'
    },
    
  })
  getAll(data: HttpData): Observable<any> {
    return data.observable;
  }
  
  // getById
  @HttpConfig({
    method: 'POST',
    params: {
      params1: 'getById'
    },
    
  })
  getById(data: HttpData): Observable<any> {
    return data.observable;
  }
  
  // line
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'line'
    },
    
  })
  line(data: HttpData): Observable<any> {
    return data.observable;
  }

  // delete
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'delete'
    },
    
  })
  delete(data: HttpData): Observable<any> {
    return data.observable;
  }
  
  // top
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'top'
    },
    
  })
  top(data: HttpData): Observable<any> {
    return data.observable;
  }

  // push
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'push'
    },
    
  })
  push(data: HttpData): Observable<any> {
    return data.observable;
  }
}
