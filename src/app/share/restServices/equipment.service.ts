import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/equipment/:params1/:params2/:params3/:params4/:params5';

  // delete
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'delete'
    },
    roles: [1001]
  })
  delete(data: HttpData): Observable<any> {
    return data.observable;
  }

  // getAllByQuery
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllByQuery'
    },
    roles: [1001]
  })
  getAllByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // getById
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getById'
    },
    roles: [1001]
  })
  getById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // saveOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'saveOrUpdate'
    },
    roles: [1001]
  })
  saveOrUpdate(data: HttpData): Observable<any> {
    return data.observable;
  }
}
