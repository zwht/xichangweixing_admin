import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { ManageService } from 'src/app/share/restServices/manage.service';
import { OtherService } from 'src/app/share/restServices/other.service';

@Component({
  selector: 'app-manage-rule-add',
  templateUrl: './manage-rule-add.component.html',
  styleUrls: ['./manage-rule-add.component.less']
})
export class ManageRuleAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;

  title = "新增管理规定";

  id = 0;
  upLoading = false;
  showEdit = true;
  preivewShow = false;
  preivewHtml;
  readOnlyText;

  categorysFoundId = [];

  departList = [];
  constructor(
    private otherService: OtherService,
    private manageService: ManageService,
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
      this.title = '编辑管理规定'
      this.id = this.route.snapshot.params['id'];
      this.manageService['getById']({
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
            this.title = "查看管理规定"
          }
          this.validateForm.get('title').setValue(detail.title);
          this.validateForm.get('content').setValue(detail.content);
          // this.validateForm.get('face').setValue(detail.face);
          this.validateForm.get('top').setValue(Number(detail.top) );
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.validateForm = this.fb.group({
      title: [null, [Validators.required,this.NameLength]],
      content: [null, [Validators.required]],
      // face:[null,[]],
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
        // face:this.validateForm.value.face,
        status:0,
        attachments: [],
        top: Number(this.validateForm.value.top),
      }
      if(this.id){
        data['id'] = this.id;
      }
      if(k){
        data['status'] = 1
      }

      this.manageService.addAndUpdate({
        data: data
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/manage-rule']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }


}
