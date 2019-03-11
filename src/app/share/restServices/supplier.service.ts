import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/supplier/:params1/:params2/:params3/:params4/:params5';

  // getAllByQuery
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllByQuery'
    },
    roles: []
  })
  getAllByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // saveOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'saveOrUpdate'
    },
    roles: []
  })
  saveOrUpdate(data: HttpData): Observable<any> {
    return data.observable;
  }

  // getById
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getById'
    },
    roles: []
  })
  getById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // delete
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'delete'
    },
    roles: []
  })
  delete(data: HttpData): Observable<any> {
    return data.observable;
  }

  // readExcel
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'readExcel'
    },
    roles: []
  })
  readExcel(data: HttpData): Observable<any> {
    return data.observable;
  }

  // importData
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'importData'
    },
    roles: []
  })
  importData(data: HttpData): Observable<any> {
    return data.observable;
  }
}
