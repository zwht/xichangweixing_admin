import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierTypeService } from '../../../share/restServices/supplier-type.service';
import { SupplierService } from '../../../share/restServices/supplier.service';
import { AdminDivisionService } from '../../../share/restServices/admin-division.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.less']
})
export class SupplierComponent implements OnInit {
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<{ checked: boolean, id: string }> = [];
  dataSet = [];
  indeterminate = false;

  supplierType: Array<{ id: string, name: string }> = [];
  supplierTypeId = '';
  name = '';
  provinceNum: string;
  cityNum: string;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = [];
  status = '';

  pageNumber = 1; // 当前页数
  pageSize = 10; // 页面中每页数量
  totalCount = 0; // 总数据
  supplierId = ''; // 供应商

  ids = []; // 删除id

  constructor(
    private router: Router,
    private supplierTypeService: SupplierTypeService,
    private supplierService: SupplierService,
    private message: NzMessageService,
    private adminDivisionService: AdminDivisionService,
  ) { }

  ngOnInit() {
    this.getSupplierType();
    this.getAdminDivision(1, '');
    this.getList();
  }

  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
  }

  getList() {
    this.supplierService['getAllByQuery']({
      params: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        name: this.name,
        status: this.status,
        type: this.supplierTypeId,
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.dataSet = response.data.pageData;
          this.totalCount = response.data.totalCount;
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
    this.empty();
  }

  getSupplierType() {
    this.supplierTypeService['getAll']({
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.supplierType = response.data;
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }
  getAdminDivision(level, id) {
    if (id == null) {
      this.city = [];
      this.cityNum = null;
      return;
    }
    this.adminDivisionService['list']({
      params: {
        params2: 1,
        params3: 10
      },
      data: {
        provinceCode: id,
        level: level
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          if (level === 1) {
            this.province = response.data.pageData;
          } else {
            this.city = [];
            this.cityNum = null;
            this.city = response.data.pageData;
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  operateData(id?): void { // 批量删除
    // let ids = '';
    // if (id) {
    //   ids = id;
    // } else {
    //   for (let index = 0; index < this.displayData.length; index++) {
    //     if (this.displayData[index].checked) {
    //       this.ids.push(this.displayData[index].id);
    //       ids = this.ids.join(',');
    //     }
    //   }
    // }
    // this.equipmentService['delete']({
    //   params: {
    //     ids: ids
    //   }
    // })
    //   .subscribe(response => {
    //     if (response.errorCode === 0) {
    //       this.message.create('success', '删除成功');
    //       this.fileChange();
    //     } else {
    //       this.message.create('error', '错误!错误代码' + response.errorCode);
    //     }
    //   });
  }
  currentPageDataChange(e): void {
    this.displayData = e;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }
  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  empty() {
    if (this.disabledButton) {
      return;
    }
    this.dataSet.forEach(value => value.checked = false);
    this.refreshStatus();
  }
}
