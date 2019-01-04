import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/:params1/:params2/:params3/:params4/:params5';

  // roomReservation
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'roomReservation',
      params2: 'getAllByQuery'
    },
  })
  roomReservation(data: HttpData): Observable<any> {
    return data.observable;
  }

  // orderingMeals
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'orderingMeals',
      params2: 'getAllByQuery'
    },
  })
  orderingMeals(data: HttpData): Observable<any> {
    return data.observable;
  }

  // vehiclePick
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'vehiclePick',
      params2: 'getAllByQuery'
    },
  })
  vehiclePick(data: HttpData): Observable<any> {
    return data.observable;
  }
}
