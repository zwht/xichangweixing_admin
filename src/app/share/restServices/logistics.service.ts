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
  // roomReservation
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'roomReservation',
      params2: 'getById'
    },
  })
  roomGetByID(data: HttpData): Observable<any> {
    return data.observable;
  }

  // roomReservation/saveOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'roomReservation',
      params2: 'saveOrUpdate'
    },
  })
  roomReservationSaveOrUpdate(data: HttpData): Observable<any> {
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
  // roomReservation
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'orderingMeals',
      params2: 'getById'
    },
  })
  orderingMealsGetByID(data: HttpData): Observable<any> {
    return data.observable;
  }
  // orderingMeals/saveOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'orderingMeals',
      params2: 'saveOrUpdate'
    },
  })
  orderingMealsSaveOrUpdate(data: HttpData): Observable<any> {
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
  // roomReservation
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'vehiclePick',
      params2: 'getById'
    },
  })
  vehiclePickGetByID(data: HttpData): Observable<any> {
    return data.observable;
  }
  // vehiclePickSaveOrUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'vehiclePick',
      params2: 'saveOrUpdate'
    },
  })
  vehiclePickSaveOrUpdate(data: HttpData): Observable<any> {
    return data.observable;
  }


}
