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

  title = "";
  startTime = null;
  endTime = null;
  
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
  onChange(e){
    if(e.length){
      this.startTime = e[0].getTime()
      this.endTime = e[1].getTime()
    }else{
      this.startTime = null;
      this.endTime = null;
    }
  }

  click(d){
    let data = JSON.parse(JSON.stringify(d))
    data.status = 1;
    this.logisticsService.vehiclePickSaveOrUpdate({
      data
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.getList();
      }
    })
  }
  getList(){
    let params = {
      // endTime:"",
      // startTime:"",
      // departmentId:"",
      title:"",
      pageNumber:this.pageNum,
      pageSize:this.pageSize,
    };
    if(this.endTime){
      params["vehicleEndTime"] = this.endTime;
    }
    if(this.startTime){
      params["vehicleStartTime"] = this.startTime;
    }
    if(this.title){
      params.title = this.title;
    }
    this.logisticsService.vehiclePick({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    })
  }

}
