import { NgModule } from '@angular/core';
import { EquipmentComponent } from './equipment/equipment.component';
import { SupplierComponent } from './supplier/supplier.component';
import { BidsComponent } from './bids/bids.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';
import { AddComponent } from './equipment/add/add.component';
import { SupplierAddComponent } from './supplier/supplier-add/supplier-add.component';
import { BigsAddComponent } from './bids/bigs-add/bigs-add.component';
import { ImportequipmentComponent } from './equipment/importequipment/importequipment.component';
import { ImportSupplierComponent } from './supplier/importequipment/importequipment.component';
import { ImportBidsComponent } from './bids/importequipment/importequipment.component';

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
        path: 'equipment/add/:id',
        component: AddComponent,
        data: {
            name: '添加设备',
            roles: [1001],
        },
    },
    {
        path: 'equipment/import',
        component: ImportequipmentComponent,
        data: {
            name: '导入设备',
            roles: [1001],
        },
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
        path: 'supplier/add/:id',
        component: SupplierAddComponent,
        data: {
            name: '添加供应商',
            roles: [1001],
        },
    },
    {
        path: 'supplier/import',
        component: ImportSupplierComponent,
        data: {
            name: '导入供应商',
            roles: [1001],
        },
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
    },
    {
        path: 'bids/add/:id',
        component: BigsAddComponent,
        data: {
            name: '添加招投标机构',
            roles: [1001],
        },
    },
    {
        path: 'bids/import',
        component: ImportBidsComponent,
        data: {
            name: '导入招标机构',
            roles: [1001],
        },
    },
];

@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ImportBidsComponent,ImportSupplierComponent, EquipmentComponent, SupplierComponent, SupplierAddComponent,
        ImportequipmentComponent, AddComponent, BidsComponent, BigsAddComponent]
})
export class InfomationModule { }
