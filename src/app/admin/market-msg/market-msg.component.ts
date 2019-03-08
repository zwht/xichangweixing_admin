import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SessionService } from 'src/app/share/services/session.service';
import { MarketService } from 'src/app/share/restServices/market.service';
import { OtherService } from 'src/app/share/restServices/other.service';

@Component({
  selector: 'app-market-msg',
  templateUrl: './market-msg.component.html',
  styleUrls: ['./market-msg.component.less']
})
export class MarketMsgComponent implements OnInit {

  constructor(
    private otherService: OtherService,
    private marketService: MarketService,
    private _message: NzMessageService,
    private sessionService: SessionService,
  ) { }

  dateRange = [];
  list = [];
  industryList = [];

  title = "";
  startTime = null;
  endTime = null;
  status = null;
  industry = null;

  pageNum = 1
  totalCount = 0;
  pageSize = 10;

  ngOnInit() {
    this.getList()
    this.getIndustry();
  }
  getIndustry() {
    this.otherService.industry({
    }).subscribe(res => {
      this.industryList = res.data
    })
  }
  onChange(e) {
    if (e.length) {
      this.startTime = e[0].getFullYear() + "-" + ("00" + (e[0].getMonth() + 1)).substr(-2) + "-" + ("00" + e[0].getDate()).substr(-2);
      this.endTime = e[1].getFullYear() + "-" + ("00" + (e[1].getMonth() + 1)).substr(-2) + "-" + ("00" + e[1].getDate()).substr(-2);
    } else {
      this.startTime = null;
      this.endTime = null;
    }
  }

  allCk = false;
  allChecked(v) {
    for (let item of this.list) {
      item.checked = v;
    }
  }
  batchDelete() {
    let d = [];
    for (let item of this.list) {
      if (item.checked) {
        d.push(item.id);
      }
    }

    this.marketService.delete({
      params: {
        ids: d
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      } else {
        this._message.info(res.msg || res.data || '删除失败')
      }
    })
  }

  getList() {
    let params = {
      // endTime:"",
      // startTime:"",
      // departmentId:"",
      title: "",
      params3: this.pageNum,
      params2: this.pageSize,
    };
    // industry
    if (this.status || this.status === 0) {
      params["status"] = this.status;
    }
    if (this.industry) {
      params["industry"] = this.industry;
    }
    if (this.endTime) {
      params["updateEndTime"] = this.endTime;
    }
    if (this.startTime) {
      params["updateStartTime"] = this.startTime;
    }
    if (this.title) {
      params.title = this.title;
    }
    this.marketService.getAll({
      params
    }).subscribe(response => {
      if (response.errorCode === 0) {
        this.list = response.data.pageData;
        for (let item of this.list) {
          item.checked = false;
        }
        this.allCk = false;
        this.totalCount = response.data.totalCount;
      }
    })
  }
  delete(d) {
    this.marketService.delete({
      params: {
        ids: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      } else {
        this._message.info(res.msg || res.data || '删除失败')
      }
    })
  }
  // 下线
  line(d) {
    this.marketService.line({
      params: {
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      } else {
        this._message.info(res.msg || res.data || '操作失败')
      }
    })
  }
  // 发布
  push(d) {
    this.marketService.push({
      params: {
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      } else {
        this._message.info(res.msg || res.data || '发布失败')
      }
    })
  }
  // 置顶
  top(d) {
    this.marketService.top({
      params: {
        id: d.id
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList()
      } else {
        this._message.info(res.msg || res.data || '发布失败')
      }
    })
  }


}
