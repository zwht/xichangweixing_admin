import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierTypeService } from '../../../share/restServices/supplier-type.service';
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
  displayData: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  operating = false;
  dataSet = [];
  indeterminate = false;

  supplierType: Array<{ id: string, name: string }> = [];
  supplierTypeId: string;
  name: string;

  constructor(
    private router: Router,
    private supplierTypeService: SupplierTypeService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.getSupplierType();
  }
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean }>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    setTimeout(_ => {
      this.dataSet.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
  }

  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
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
}
