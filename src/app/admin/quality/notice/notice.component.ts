import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { ArmService } from 'src/app/share/restServices/arm.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less']
})
export class NoticeComponent implements OnInit {

  constructor(
    private armService: ArmService,
    private _message: NzMessageService,
  ) { }
  
  dateRange = [];
  list = [];

  title = "";
  startTime = null;
  endTime = null;
  
  pageNum = 1
  totalCount = 0;
  pageSize = 10;
  
  ngOnInit() {
    this.getList()
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


  getList(){
    let params = {
      // endTime:"",
      // startTime:"",
      // departmentId:"",
      title:"",
      params3:this.pageNum,
      params2:this.pageSize,
    };
    if(this.endTime){
      params["endTime"] = this.endTime;
    }
    if(this.startTime){
      params["startTime"] = this.startTime;
    }
    if(this.title){
      params.title = this.title;
    }
    this.armService.getAll({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    })
  }
  delete(d){
    this.armService.delete({
      params:{
        ids: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      }else{
        this._message.info(res.msg || res.data || '删除失败')
      }
    })
  }
  // 下线
  line(d){
    this.armService.line({
      params:{
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      }else{
        this._message.info(res.msg || res.data || '操作失败')
      }
    })
  }
  // 发布
  push(d){
    this.armService.push({
      params:{
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      }else{
        this._message.info(res.msg || res.data || '发布失败')
      }
    })
  }
  // 置顶
  top(d){
    this.armService.top({
      params:{
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      }else{
        this._message.info(res.msg || res.data || '发布失败')
      }
    })
  }

}
