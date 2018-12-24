import { NgModule } from '@angular/core';
import { EquipmentComponent } from './equipment/equipment.component';
import { SupplierComponent } from './supplier/supplier.component';
import { BidsComponent } from './bids/bids.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';

export const routes: Routes = [
  {
      path: 'equipment',
      component: EquipmentComponent,
      data: {
          name: '设备',
          roles: [1001],
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'supplier',
      component: SupplierComponent,
      data: {
          name: '供应商',
          roles: [1001],
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'bids',
      component: BidsComponent,
      data: {
          name: '招投标机构管理',
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
  declarations: [EquipmentComponent, SupplierComponent, BidsComponent]
})
export class InfomationModule { }