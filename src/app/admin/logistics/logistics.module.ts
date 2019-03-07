import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { CarComponent } from './car/car.component';
import { FoodComponent } from './food/food.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';
import { RoomDetailComponent } from './room/detail/detail';
import { CarDetailComponent } from './car/detail/detail';
import { FoodDetailComponent } from './food/detail/detail';

export const routes: Routes = [
  {
    path: 'equipment',
    component: RoomComponent,
    data: {
      name: '客房预定',
      roles: [1001],
      menu: true
    },
    canActivate: [PermissionGuardService]
  },
  {
    path: 'equipment/detail/:id',
    component: RoomDetailComponent,
    data: {
      name: '客房预定详情',
      roles: [1001],
      menu: false
    },
    canActivate: [PermissionGuardService]
  },
  {
    path: 'car',
    component: CarComponent,
    data: {
      name: '车辆接送',
      roles: [1001],
      menu: true
    },
    canActivate: [PermissionGuardService]
  },
  {
    path: 'car/detail/:id',
    component: CarDetailComponent,
    data: {
      name: '车辆接送详情',
      roles: [1001],
      menu: false
    },
    canActivate: [PermissionGuardService]
  },
  {
    path: 'bids',
    component: FoodComponent,
    data: {
      name: '网上订餐',
      roles: [1001],
      menu: true
    },
    canActivate: [PermissionGuardService]
  },
  {
    path: 'bids/detail/:id',
    component: FoodDetailComponent,
    data: {
      name: '网上订餐详情',
      roles: [1001],
      menu: false
    },
    canActivate: [PermissionGuardService]
  },
];
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoodDetailComponent, RoomDetailComponent, CarDetailComponent, RoomComponent, CarComponent, FoodComponent]
})
export class LogisticsModule { }
