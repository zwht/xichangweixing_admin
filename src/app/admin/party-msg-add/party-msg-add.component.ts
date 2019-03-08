import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { PartyService } from 'src/app/share/restServices/party.service';

@Component({
  selector: 'app-party-msg-add',
  templateUrl: './party-msg-add.component.html',
  styleUrls: ['./party-msg-add.component.less']
})
export class PartyMsgAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = "新增党建要闻";
  roleList = [];
  id = 0;
  upLoading = false;
  region = {
    "cityCode": "5134",
    "cityName": "凉山彝族自治州",
    "countyCode": "513401",
    "countyName": "西昌市",
    "provinceCode": "51",
    "provinceName": "四川省",
  }
  townList = [];
  villageList = [];
  nzHeaders = {
    // Authorization:"Banner eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZXJmb3JtZXIiLCJVU0VSIjoie1wiZGF0YVwiOntcImlkXCI6MTAwLFwibG9ja2VkXCI6dHJ1ZSxcInVzZXJOYW1lXCI6XCJhZG1pblwifSxcImVycm9yQ29kZVwiOjAsXCJtc2dcIjpcIlwifSIsImV4cCI6MTU0NTcyNjU3NSwiaWF0IjoxNTQ1NzI1OTc1fQ.01-ktpjd0Vn_xRhBicZ4Z1qYN3rbrQaZVfKQhYlf3aM"
  }
  preivewShow = false;
  preivewHtml;

  categorysFoundId = [];
  constructor(
    private partyService: PartyService,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    // private regionService: RegionService,
    // private sessionService: SessionService,
    private _message: NzMessageService,
    // private regExpService: RegExpService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if(this.router.url.indexOf("edit")>-1){
      this.title = '编辑党建要闻'
      this.id = this.route.snapshot.params['id'];
      this.partyService['getById']({
        params:{
          params2: this.id,
        }
      }).subscribe(response => {
        this.loading = false;
        if (response.errorCode === 0) { 
          let detail = response.data;
          this.validateForm.get('title').setValue(detail.title);
          this.validateForm.get('content').setValue(detail.content);
          this.validateForm.get('top').setValue(detail.flag === 'true' ? '1' : '0');
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.validateForm = this.fb.group({
      title: [null, [Validators.required,this.NameLength]],
      content: [null, [Validators.required]],
      top:[0,[]],
    });
  }
  
  NameLength = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.length>60) {
      return { length: true, error: true };
      // control.value
    }
  }

  openFile(){
    if(this.upLoading){
      return this._message.create('info','文件上传中，请稍后')
    }
    document.getElementById('file').click()
  }
  uploadFile(element){
    if(!element.target.files.length){
      return
    }   
    let file = element.target.files[0];       
    let param = new FormData(); 
    console.log(param)
    param.append('file',file,file.name);
    //param.append('chunk','0'); 
    // if(param.get('file')['size'] > 2 * 1024 * 1024){
    //   return  this._message.create('info', '回复文件不能大于2M', { nzDuration: 4000 });
    // }
    let a = param.get('file')['type']
    if(a != 'image/png' && a != 'image/jpeg' && a != 'image/gif' && a != 'image/bmp'){
      element.target.value = ''
      return this._message.create('info', '请上传图片', { nzDuration: 4000 });
    }
    // this.fileName = file.name
    this.upLoading = true
    this.fileService.uploadHead({
      data: param
    }).subscribe(res => {
      console.log(res)
      element.target.value = '';
      this.upLoading = false;
      if(res.errorCode == 0){
        // res.data.fileUrl
        this.validateForm.get('face').setValue(res.data.fileUrl.replace(/\//,"%2f"));
      }
    })
  }

  preview() {
    this.preivewHtml = this.sanitizer.bypassSecurityTrustHtml(this.validateForm.value.content);
    this.preivewShow = true;
  }
  previewClose() {
    this.preivewHtml = this.sanitizer.bypassSecurityTrustHtml('');
    this.preivewShow = false;
  }
  submitForm(k?): void {
    // 验证表单
    for (const i in this.validateForm.controls) {
      if ((this.validateForm as any).controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.valid) {
      this.loading = true;
      let data = {
        title: this.validateForm.value.title,
        content: this.validateForm.value.content,
        top: Number(this.validateForm.value.top),
        status:0,
        attachments:[],
      }
      if(this.id){
        data['id'] = this.id;
      }
      if(k){
        data['status'] = 1
      }

      this.partyService.addAndUpdate({
        data: data
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/party-msg']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }
}
