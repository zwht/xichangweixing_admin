import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../../../share/restServices/equipment.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.less']
})
export class EquipmentComponent implements OnInit {
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<{ checked: boolean, id: string }> = [];
  dataSet = [];
  indeterminate = false;

  name = ''; // 设备名称
  pageNumber = 1; // 当前页数
  pageSize = 10; // 页面中每页数量
  totalCount = 0; // 总数据
  status = ''; // 状态
  supplierName = ''; // 供应商

  ids = []; // 删除id

  constructor(
    private router: Router,
    private equipmentService: EquipmentService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.fileChange();
  }

  fileChange() {
    this.equipmentService['getAllByQuery']({
      params: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        name: this.name,
        status: this.status,
        supplierName: this.supplierName,
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


  operateData(id?): void {
    let ids = '';
    if (id) {
      ids = id;
    } else {
      for (let index = 0; index < this.displayData.length; index++) {
        if (this.displayData[index].checked) {
          this.ids.push(this.displayData[index].id);
          ids = this.ids.join(',');
        }
      }
    }
    this.equipmentService['delete']({
      params: {
        ids: ids
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.message.create('success', '删除成功');
          this.fileChange();
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }


  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
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
