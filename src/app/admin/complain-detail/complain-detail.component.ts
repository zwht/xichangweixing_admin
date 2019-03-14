import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  id = 0;
  dealText;
  detail = {
    "id": "",
    "reportName": null,
    "works": "",
    "phone": null,
    "title": "",
    "content": null,
    "reportTime": null,
    "dealTime": null,
    "status": "",
    "createUser": null,
    "createTime": null,
    "updateUser": "",
    "updateTime": "",
    "flag": null
  };
  flag;
  title;
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
    this.title = '投诉详情';
    this.id = this.route.snapshot.params['id'];
    this.complainService['getById']({
      params: {
        params2: this.id,
      }
    }).subscribe(response => {
      if (response.errorCode === 0) {
        // 获取详情
        this.detail = response.data;
      } else {
        this._message.create('error', response.msg, { nzDuration: 4000 });
      }
    });
  }
  save() {
    this.complainService.handl({
      data: {
        id: this.id,
        suggestion: this.dealText,
      }
    })
      // this.complainService.handl({
      //   data: data
      // })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.router.navigate(['/admin/complain']);
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
  }

}
