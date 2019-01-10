import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { NoticeService } from 'src/app/share/restServices/notice.service';

@Component({
  selector: 'app-p-notice',
  templateUrl: './p-notice.component.html',
  styleUrls: ['./p-notice.component.less']
})
export class PNoticeComponent implements OnInit {

  constructor(
    private noticeService: NoticeService,
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

  allCk = false;
  allChecked(v){
    for(let item of this.list){
      item.checked = v;
    }
  }
  batchDelete(){
    let d = [];
    for(let item of this.list){
      if(item.checked){
        d.push(item.id);
      }
    }
    
    this.noticeService.delete({
      params:{
        ids: d
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      }else{
        this._message.info(res.msg || res.data || '删除失败')
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
    if(this.status||this.status === 0){
      params["status"] = this.status;
    }
    if(this.endTime){
      params["endTime"] = this.endTime;
    }
    if(this.startTime){
      params["startTime"] = this.startTime;
    }
    if(this.title){
      params.title = this.title;
    }
    this.noticeService.getAll({
        params
    }).subscribe(response =>{
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        for(let item of this.list){
          item.checked = false;
        }
        this.allCk = false;
        this.totalCount = response.data.totalCount;
      }
    })
  }
  delete(d){
    this.noticeService.delete({
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
    this.noticeService.line({
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
    this.noticeService.push({
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
    this.noticeService.top({
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
