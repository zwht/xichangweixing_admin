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

}
