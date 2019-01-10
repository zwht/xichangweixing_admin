import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { ManageService } from 'src/app/share/restServices/manage.service';

@Component({
  selector: 'app-manage-rule',
  templateUrl: './manage-rule.component.html',
  styleUrls: ['./manage-rule.component.less']
})
export class ManageRuleComponent implements OnInit {

  constructor(
    private manageService: ManageService,
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
  allCk = false;
  
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
    
    this.manageService.delete({
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
      params3:this.pageNum,
      params2:this.pageSize,
    };
    if(this.status||this.status === 0){
      params["status"] = this.status;
    }
    if(this.endTime){
      params["updateEndTime"] = this.endTime;
    }
    if(this.startTime){
      params["updateStartTime"] = this.startTime;
    }
    if(this.title){
      params.title = this.title;
    }
    this.manageService.getAll({
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
    this.manageService.delete({
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
    this.manageService.line({
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
    this.manageService.push({
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
    this.manageService.top({
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
