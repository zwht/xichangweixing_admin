import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { CarComponent } from './car/car.component';
import { FoodComponent } from './food/food.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';

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
      path: 'supplier',
      component: CarComponent,
      data: {
          name: '车辆接送',
          roles: [1001],
          menu: true
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
  }
]
@NgModule({
    imports: [
      ShareModule,
      RouterModule.forChild(routes)
    ],
  declarations: [RoomComponent, CarComponent, FoodComponent]
})
export class LogisticsModule { }
