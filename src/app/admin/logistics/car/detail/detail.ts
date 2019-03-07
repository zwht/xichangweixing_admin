import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/share/restServices/news.service';
import { FileService } from 'src/app/share/restServices/file.service';
import { LogisticsService } from 'src/app/share/restServices/logistics.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.less']
})
export class CarDetailComponent implements OnInit {
  id;
  detailList = [
    {
      name: '用车单位/人员姓名',
      key: 'name',
      value: ''
    },
    {
      name: '用车时间',
      key: 'applicationTime',
      value: ''
    },
    {
      name: '接送站地点',
      key: 'address',
      value: ''
    },
    {
      name: '航班号',
      key: 'flight',
      value: ''
    },
    {
      name: '车次',
      key: 'trainNumber',
      value: ''
    },
    {
      name: '用车人数',
      key: 'trainPersons',
      value: ''
    },
    {
      name: '申请车型',
      key: 'vehicleType',
      value: ''
    },
    {
      name: '行驶区域',
      key: 'vehicleArea',
      value: ''
    },

    {
      name: '联系电话',
      key: 'phone',
      value: ''
    },
    {
      name: '申请事由',
      key: 'applicationReason',
      value: ''
    }
  ];
  detail = { status: '1' };
  constructor(
    private _message: NzMessageService,
    private logisticsService: LogisticsService,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getDetail();
    }
  }
  getDetail() {
    this.logisticsService.vehiclePickGetByID({
      params: {
        params3: this.id
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.detail = { ...response.data };
          this.detailList.forEach(item => {
            item.value = response.data[item.key];
          });
        }
      });
  }
  save() {
    this.detail.status = '1';
    this.logisticsService.vehiclePickSaveOrUpdate({
      data: this.detail
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this._message.success('确定成功');
          this.getDetail();
        }
      });
  }
}
