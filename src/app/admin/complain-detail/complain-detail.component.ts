import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { ComplainService } from 'src/app/share/restServices/complain.service';

@Component({
  selector: 'app-complain-detail',
  templateUrl: './complain-detail.component.html',
  styleUrls: ['./complain-detail.component.less']
})
export class ComplainDetailComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = "新增强军要闻";
  roleList = [];
  id = 0;
  upLoading = false;
  showEdit = true;
  preivewShow = false;
  preivewHtml;
  readOnlyText;
  flag = false;
  dealText = "";
  detail = {
    "id":"",
    "reportName":null,
    "works":"",
    "phone":null,
    "title":"",
    "content":null,
    "reportTime":null,
    "dealTime":null,
    "status":"",
    "createUser":null,
    "createTime":null,
    "updateUser":"",
    "updateTime":"",
    "flag":null
};
  categorysFoundId = [];
  constructor(
    private complainService: ComplainService,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private _message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.title = '投诉详情'
    this.id = this.route.snapshot.params['id'];
    this.complainService['getById']({
      params:{
        params2: this.id,
      }
    }).subscribe(response => {
      this.loading = false;
      if (response.errorCode === 0) { 
        // 获取详情
        this.detail = response.data;
      } else {
        this._message.create('error', response.msg, { nzDuration: 4000 });
      }
    });
  }
  submit(){
    if(this.dealText == ''){
      this._message.create('error', "请输入处理意见", { nzDuration: 4000 });
    }
    let data = JSON.parse(JSON.stringify(this.detail))
    data.status = 1;
    
    // this.complainService.push({
    //   data: {
    //     id:this.id
    //   }
    // })
    this.complainService.addAndUpdate({
      data: data
    })
    .subscribe(response => {
      this.loading = false;
      if (response.errorCode === 0) {
        this.router.navigate(['/admin/complain']);
      } else {
        this._message.create('error', response.msg, { nzDuration: 4000 });
      }
    });
  }

}
