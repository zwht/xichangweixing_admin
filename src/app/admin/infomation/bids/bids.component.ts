import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDivisionService } from '../../../share/restServices/admin-division.service';
import { BidsService } from '../../../share/restServices/bids.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.less']
})
export class BidsComponent implements OnInit {
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<{ checked: boolean, id: string }> = [];
  dataSet = [];
  indeterminate = false;

  provinceNum: string;
  cityNum: string;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = [];
  status = '';
  name = '';
  region = '';
  grade = '';

  pageNumber = 1; // 当前页数
  pageSize = 10; // 页面中每页数量
  totalCount = 0; // 总数据

  ids = []; // 删除id

  constructor(
    private router: Router,
    private message: NzMessageService,
    private adminDivisionService: AdminDivisionService,
    private bidsService: BidsService,
  ) { }

  ngOnInit() {
    this.getList();
    this.getAdminDivision(1, '');
  }

  getList() {
    this.bidsService['getAllByQuery']({
      params: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        name: this.name,
        status: this.status,
        region: this.region,
        grade: this.grade
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
  getAdminDivision(level, id) {
    if (id == null) {
      this.city = [];
      this.cityNum = null;
      return;
    }
    this.adminDivisionService['list']({
      params: {
        params2: 1,
        params3: 9999
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

  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
  }

  operateData(id?): void { // 批量删除
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
    this.bidsService['delete']({
      params: {
        ids: ids
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.message.create('success', '删除成功');
          this.getList();
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
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
