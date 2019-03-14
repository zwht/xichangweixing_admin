import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { QualityEventService } from 'src/app/share/restServices/quality-event.service';
import { SupplierService } from 'src/app/share/restServices/supplier.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.less']
})
export class AccidentComponent implements OnInit {

  constructor(
    private supplierService: SupplierService,
    private qualityEventService: QualityEventService,
    private _message: NzMessageService,
  ) { }

  dateRange = [];
  list = [];
  supplierList = [];

  name = "";
  endTime = null;
  status = null;
  eventLevel = null;
  supplierId = null;

  pageNum = 1
  totalCount = 0;
  pageSize = 10;

  ngOnInit() {
    this.getList()
    this.getIndustry();
  }
  getIndustry() {
    this.supplierService.getAllByQuery({
      params: {
        pageNumber: 1,
        pageSize: 1000,
      }
    }).subscribe(res => {
      this.supplierList = res.data.pageData
    })
  }
  onChange(e) {
    if (e) {
      this.endTime = e.getFullYear() + "-" + ("00" + (e.getMonth() + 1)).substr(-2) + "-" + ("00" + e.getDate()).substr(-2);
    } else {
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

    this.qualityEventService.delete({
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
  setHe(item, key) {
    this.qualityEventService.hdSet({
      params: {
        id: item.id,
        key
      }
    }).subscribe(res => {
      if (res.errorCode === 0) {
        this.getList();
      } else {
        this._message.info(res.msg || res.data || '删除失败');
      }
    });
  }

  getList() {
    let params = {
      name: "",
      pageNumber: this.pageNum,
      pageSize: this.pageSize,
    };

    if (this.status || this.status === 0) {
      params["status"] = this.status;
    }
    if (this.eventLevel) {
      params["eventLevel"] = this.eventLevel;
    }
    if (this.supplierId) {
      params["supplierId"] = this.supplierId;
    }
    if (this.endTime) {
      params["occurrenceTime"] = this.endTime;
    }
    if (this.name) {
      params.name = this.name;
    }
    this.qualityEventService.getAllByQuery({
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
    this.qualityEventService.delete({
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
    this.qualityEventService.line({
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
    this.qualityEventService.push({
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
    this.qualityEventService.top({
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
