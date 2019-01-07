import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { DownloadService } from 'src/app/share/restServices/download.service';
import { OtherService } from 'src/app/share/restServices/other.service';

@Component({
  selector: 'app-download-list-add',
  templateUrl: './download-list-add.component.html',
  styleUrls: ['./download-list-add.component.less']
})
export class DownloadListAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = "新增资料";

  fileName = "";
  fileUrl = "";

  id = 0;

  upLoading = false;
  showEdit = true;
  preivewShow = false;

  preivewHtml;
  readOnlyText;

  subjectList = [];
  constructor(
    private downloadService: DownloadService,
    private otherService: OtherService,
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
      this.title = '编辑资料'
      this.id = this.route.snapshot.params['id'];
      this.downloadService['getById']({
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
            this.title = "查看资料"
          }
          // this.validateForm.get('title').setValue(detail.title);
          // this.validateForm.get('content').setValue(detail.content);
          this.validateForm.get('subject').setValue(detail.subject);
          // this.validateForm.get('face').setValue(detail.face);
          this.validateForm.get('top').setValue(Number(detail.top) );
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.validateForm = this.fb.group({
      subject:[null, [Validators.required]],
      top:[0,[]],
    });
    this.getsubject();
  }
  getsubject(){
    this.otherService.subject({
    }).subscribe(res=>{
      this.subjectList = res.data
    })
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

    param.append('file',file,file.name);
    //param.append('chunk','0'); 
    // if(param.get('file')['size'] > 2 * 1024 * 1024){
    //   return  this._message.create('info', '回复文件不能大于2M', { nzDuration: 4000 });
    // }
    let a = param.get('file')['type']
    
    this.fileName = file.name
    this.upLoading = true
    this.fileService.uploadHead({
      data: param
    }).subscribe(res => {
      console.log(res)
      element.target.value = '';
      this.upLoading = false;
      if(res.errorCode == 0){
        this.fileUrl = res.data.fileUrl.replace(/\//,"%2f");
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
        reportName: this.fileName,
        subjectId:this.validateForm.value.subject,
        flag:this.fileUrl,
        status:0,
        top: Number(this.validateForm.value.top),
      }
      if(this.id){
        data['id'] = this.id;
      }
      if(k){
        data['status'] = 1
      }

      this.downloadService.addAndUpdate({
        data: data
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/download-list']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }

}
