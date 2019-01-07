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
  data = [];
  dateRange = [];
  name;
  endTime;
  startTime;
  pageNum = 1
  totalCount = 0;
  pageSize = 10;

  constructor(
    private logisticsService: LogisticsService,
    private _message: NzMessageService,
    private sessionService: SessionService,) { }

  ngOnInit() {
    this.getList();
  }


  getList(){
    let params = {
      // endTime:"",
      // startTime:"",
      // departmentId:"",
      name:"",
      pageNumber:this.pageNum,
      pageSize:this.pageSize,
    };
    if(this.endTime){
      params["vehicleEndTime"] = this.endTime;
    }
    if(this.startTime){
      params["vehicleStartTime"] = this.startTime;
    }
    if(this.name){
      params.name = this.name;
    }
    this.logisticsService.vehiclePick({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.data = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    })
  }

}
