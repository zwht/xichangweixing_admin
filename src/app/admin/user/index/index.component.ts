import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../share/restServices/user.service';
import { CodeDataService } from '../../../share/services/code-data.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../common/style/list.less', './index.component.less']
})
export class IndexComponent implements OnInit {

  loginName = null;
  name = '';
  phone = '';
  zhungtai = null;
  pageSize = 10;
  pageNum = 1;
  totalCount = null;
  DATA = [];

  codeList = [];
  codeObjList = {};
  codeObj = {};

  fileUrl = '';

  list = [];
  constructor(
    private userService: UserService,
    private codeDataService: CodeDataService
  ) { }

  ngOnInit() {
    this.codeObj = this.codeDataService.codeObj;
    this.getList();
  }

  getList(num?) {
    if (num) {
      this.pageNum = num;
    }
    this.userService.getAllUser({
      params: {
        pageNumber: this.pageNum,
        pageSize: this.pageSize,
        name: this.name,
        phone: this.phone,
        // email: this.zhungtai
      }
    })
      .subscribe(response => {
        if (response.errorCode === 1) {
          this.list = response.data.pageData;
          this.totalCount = response.data.totalCount;
        }
      });
  }
  cancel() { }

  deldeldel(id, key) {
    if (key) {
      this.userService.able({
        params: {
          id
        },
        data: {}
      })
        .subscribe(response => {
          if (response.errorCode === 0) {
            this.getList();
          }
        });
    } else {
      this.userService.disable({
        params: {
          id
        },
        data: {}
      })
        .subscribe(response => {
          if (response.errorCode === 0) {
            this.getList();
          }
        });
    }

  }

  StateOK(id) {
    // this.userService.updateState({
    //   params: {
    //     id: id,
    //     state: true
    //   },
    //   data: {}
    // })
    //   .subscribe(response => {
    //     if (response.code === 200) {
    //       this.getList();
    //     }
    //   });
  }

  StateNO(id) {
    // this.userService.updateState({
    //   params: {
    //     id: id,
    //     state: false

    //   },
    //   data: {}
    // })
    //   .subscribe(response => {
    //     if (response.code === 200) {
    //       this.getList();
    //     }
    //   });
  }

  fanyi() {

  }
}
