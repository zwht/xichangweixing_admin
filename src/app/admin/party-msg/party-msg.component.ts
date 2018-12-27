import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { PartyService } from 'src/app/share/restServices/party.service';

@Component({
  selector: 'app-party-msg',
  templateUrl: './party-msg.component.html',
  styleUrls: ['./party-msg.component.less']
})
export class PartyMsgComponent implements OnInit {

  constructor(
    private partyService: PartyService,
    private _message: NzMessageService,
    private sessionService: SessionService,
  ) { }

  treeList = [];

  dateRange = [];
  list = [];
  
  startTime = null;
  endTime = null;
  title = "";

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
    this.partyService.getAll({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        this.totalCount = response.data.totalCount;
      }
    })
  }
  delete(d){
    this.partyService.delete({
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
    this.partyService.line({
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
    this.partyService.push({
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
    this.partyService.top({
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
