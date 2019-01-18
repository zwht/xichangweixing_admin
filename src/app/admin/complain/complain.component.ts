import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { ComplainService } from 'src/app/share/restServices/complain.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.less']
})
export class ComplainComponent implements OnInit {

  constructor(
    private complainService: ComplainService,
    private _message: NzMessageService,
    private sessionService: SessionService,
  ) { }
  
  dateRange = [];
  list = [];

  title = "";
  startTime = null;
  endTime = null;
  status = null;
  
  pageNum = 1
  totalCount = 0;
  pageSize = 10;
  
  ngOnInit() {
    this.getList()
  }
  onChange(e){
    if(e.length){
      this.startTime = e[0].getFullYear()+"-"+("00"+( e[0].getMonth()+1)).substr(-2)+"-"+("00"+ e[0].getDate()).substr(-2);
      this.endTime = e[1].getFullYear()+"-"+("00"+( e[1].getMonth()+1)).substr(-2)+"-"+("00"+ e[1].getDate()).substr(-2);
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
      params["updateEndTime"] = this.endTime;
    }
    if(this.startTime){
      params["updateStartTime"] = this.startTime;
    }
    if(this.title){
      params.title = this.title;
    }
    this.complainService.getAll({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    })
  }
  delete(d){
    // this.complainService.delete({
    //   params:{
    //     ids: d.id
    //   }
    // }).subscribe(res => {
    //   if (res.errorCode === 0) {
    //     this.getList()
    //   }else{
    //     this._message.info(res.msg || res.data || '删除失败')
    //   }
    // })
  }
  // 下线
  line(d){
    this.complainService.line({
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
    this.complainService.push({
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
    this.complainService.top({
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
