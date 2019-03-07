import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { LogisticsService } from 'src/app/share/restServices/logistics.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.less']
})
export class CarComponent implements OnInit {

  dateRange = [];
  list = [];
  title = '';
  pageNum = 1;
  totalCount = 0;
  pageSize = 10;
  constructor(
    private logisticsService: LogisticsService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const params = {
      vehicleStartTime: this.dateRange[0] ? this.dateRange[0].getTime() : '',
      vehicleEndTime: this.dateRange[1] ? this.dateRange[1].getTime() : '',
      name: this.title,
      pageNumber: this.pageNum,
      pageSize: this.pageSize,
    };
    this.logisticsService.vehiclePick({
      params
    }).subscribe(response => {
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    });
  }

}
