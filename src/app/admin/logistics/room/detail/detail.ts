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
export class RoomDetailComponent implements OnInit {
  id;
  detailList = [
    {
      name: '姓名',
      key: 'name',
      value: ''
    },
    {
      name: '工作单位',
      key: 'workers',
      value: ''
    },
    {
      name: '是否为军人',
      key: 'arm',
      type: 'select',
      list: { '0': '不是', '1': '是' },
      value: ''
    },
    {
      name: '军官证号',
      key: 'armNum',
      value: ''
    },
    {
      name: '与军人关系',
      key: 'withArm',
      value: ''
    },
    {
      name: '身份证号',
      key: 'idnum',
      value: ''
    },
    {
      name: '入住日期',
      key: 'livingTime',
      value: ''
    },
    {
      name: '离店日期',
      key: 'leavingDate',
      value: ''
    },

    {
      name: '留房时间',
      key: 'allotment',
      value: ''
    },
    {
      name: '联系电话',
      key: 'phone',
      value: ''
    },
    {
      name: '入住人数',
      key: 'persons',
      value: ''
    },
    {
      name: '订房',
      key: 'roomsType',
      list: { '1': '单间', '2': '标间', '3': '小套间', '4': '大套房' },
      value: '',
      render: (e, d) => {
        const rType = d.roomsType.split(',');
        let value = d.rooms.split(',').map((item, i) => {
          return e.list[rType[i]] + '(' + item + '间)';
        });
        value = value.join('，');
        return value;
      }
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
    this.logisticsService.roomGetByID({
      params: {
        params3: this.id
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.detail = { ...response.data };
          this.detailList.forEach(item => {
            if (item.type && item.type === 'select') {
              item.value = item.list[response.data[item.key] + ''];
            } else if (item.render) {
              item.value = item.render(item, response.data);
            } else {
              item.value = response.data[item.key];
            }
          });
        }
      });
  }
  save() {
    this.detail.status = '1';
    this.logisticsService.roomReservationSaveOrUpdate({
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
