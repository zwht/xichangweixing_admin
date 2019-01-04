import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { OutlinkService } from 'src/app/share/restServices/outlink.service';

@Component({
  selector: 'app-outlink-add',
  templateUrl: './outlink-add.component.html',
  styleUrls: ['./outlink-add.component.less']
})
export class OutlinkAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = "新增外部链接";
  roleList = [];
  id = 0;
  upLoading = false;
  showEdit = true;
  preivewShow = false;
  preivewHtml;
  readOnlyText;

  categorysFoundId = [];
  constructor(
    private outLinkService: OutlinkService,
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
      this.title = '编辑外部链接'
      this.id = this.route.snapshot.params['id'];
      this.outLinkService['getById']({
        params:{
          params2: this.id,
        }
      }).subscribe(response => {
        this.loading = false;
        if (response.errorCode === 0) { 
          let detail = response.data;
          if(detail.status == 1){
            this.showEdit = false;
            this.readOnlyText = this.sanitizer.bypassSecurityTrustHtml(detail.content);
            this.title = "查看外部链接"
          }
          this.validateForm.get('name').setValue(detail.name);
          this.validateForm.get('link').setValue(detail.link);
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      link: [null, [Validators.required]],
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
    let a = param.get('file')['type']
    if(a != 'image/png' && a != 'image/jpeg' && a != 'image/gif' && a != 'image/bmp'){
      element.target.value = ''
      return this._message.create('info', '请上传图片', { nzDuration: 4000 });
    }
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
        name: this.validateForm.value.name,
        link: this.validateForm.value.link,
        status:0,
      }
      if(k){
        data['status'] = 1
      }
      if(this.id){
        data['id'] = this.id;

        this.outLinkService.update({
          data: data
        })
          .subscribe(response => {
            this.loading = false;
            if (response.errorCode === 0) {
              this.router.navigate(['/admin/outlink']);
            } else {
              this._message.create('error', response.msg, { nzDuration: 4000 });
            }
          });
      }
      else{

        this.outLinkService.addAndUpdate({
          data: data
        })
          .subscribe(response => {
            this.loading = false;
            if (response.errorCode === 0) {
              this.router.navigate(['/admin/outlink']);
            } else {
              this._message.create('error', response.msg, { nzDuration: 4000 });
            }
          });
      }
    }
  }

}
