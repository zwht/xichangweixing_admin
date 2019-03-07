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
export class FoodDetailComponent implements OnInit {
  id;
  detailList = [
    {
      name: '用餐人姓名',
      key: 'name',
      value: ''
    },
    {
      name: '身份证号',
      key: 'idnum',
      value: ''
    },
    {
      name: '联系电话',
      key: 'phone',
      value: ''
    },
    {
      name: '工作单位',
      key: 'workers',
      value: ''
    },
    {
      name: '用餐人数',
      key: 'eatsCount',
      value: ''
    },
    {
      name: '用餐时间',
      key: 'eatTime',
      value: ''
    },
    {
      name: '备注',
      key: 'remark',
      value: ''
    },
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
    this.logisticsService.orderingMealsGetByID({
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
    this.logisticsService.orderingMealsSaveOrUpdate({
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
