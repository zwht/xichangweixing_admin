import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
// import { PolicyDataService } from 'src/app/share/restServices/policy-data.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  constructor(
    // private policyService: PolicyDataService,
    private _message: NzMessageService,
    private sessionService: SessionService,
  ) { }
  region = {
    "cityCode": "5134",
    "cityName": "凉山彝族自治州",
    "countyCode": "513401",
    "countyName": "西昌市",
    "provinceCode": "51",
    "provinceName": "四川省",
  }
  token = this.sessionService.getItem('token');
  treeList = [];

  dateRange = [];
  list = [];
  dervison = "全部"
  departmentName = "全部"
  startTime = null;
  endTime = null;
  departmentId = null;
  categoryFundsId = null;
  pageNum = 1
  totalCount = 0;
  pageSize = 10;
  ngOnInit() {
    this.getList()
    this.getAccountTree();
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
  getThis(obj,item?){
    if(obj.all){
      this.dervison = "全部"
      this.departmentId = null;
      this.categoryFundsId = null;
    }
    else{
      this.departmentName = obj.fundsName;
      this.departmentId = item.id;
      this.categoryFundsId = obj.id;
    }
    this.getList();
  }
  getAccountTree(){
    // this.policyService.getTree({
    //   params:{},
    //   data:{
    //   }
    // }).subscribe(res => {
    //   if(res.errorCode == 0){
    //     console.log(res)
    //     this.treeList = res.data
    //     for(let item of this.treeList){
    //       item.childrenShow = false;
    //     }
    //   }
    // })
  }


  getList(){
    let params = {
      endTime:"",
      startTime:"",
      // departmentId:"",
      categoryFundsId:"",
    };
    if(this.endTime){
      params.endTime = this.endTime;
    }
    if(this.startTime){
      params.startTime = this.startTime;
    }
    // if(this.departmentId){
    //   params.departmentId = this.departmentId;
    // }
    if(this.categoryFundsId){
      params.categoryFundsId = this.categoryFundsId;
    }
    // this.policyService['getListByCondition']({
    //     params
    // }).subscribe(response =>{
    //   if (response.errorCode === 0) {
    //     this.list = response.data;
    //   }
    // })
  }
  delete(d){
    // this.policyService.deleteById({
    //   params:{
    //     policyId: d.id
    //   }
    // }).subscribe(res => {
    //   if (res.errorCode === 0) {
    //     this.getList()
    //   }else{
    //     this._message.info(res.msg || res.data || '删除失败')
    //   }
    // })
  }

}
