import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { QualityEventService } from 'src/app/share/restServices/quality-event.service';
import { SupplierService } from 'src/app/share/restServices/supplier.service';

@Component({
  selector: 'app-accident-add',
  templateUrl: './accident-add.component.html',
  styleUrls: ['./accident-add.component.less']
})
export class AccidentAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = '新增质量事件';
  roleList = [];
  id = 0;
  upLoading = false;
  showEdit = true;
  preivewShow = false;
  preivewHtml;
  readOnlyText;

  categorysFoundId = [];

  supplierList = [];

  constructor(
    private supplierService: SupplierService,
    private qualityEventService: QualityEventService,
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
    if (this.router.url.indexOf('edit') > -1) {
      this.title = '编辑事件'
      this.id = this.route.snapshot.params['id'];
      this.qualityEventService['getById']({
        params: {
          params2: this.id,
        }
      }).subscribe(response => {
        this.loading = false;
        if (response.errorCode === 0) {
          let detail = response.data;
          if (detail.status == 1) {
            this.showEdit = false;
            this.readOnlyText = this.sanitizer.bypassSecurityTrustHtml(detail.content);
            this.title = '查看事件';
          }
          this.validateForm.get('name').setValue(detail.name);
          this.validateForm.get('remark').setValue(detail.remark);
          this.validateForm.get('supplierId').setValue(detail.supplierId);
          this.validateForm.get('eventLevel').setValue(detail.eventLevel);
          this.validateForm.get('materials').setValue(detail.materials);
          this.validateForm.get('occurrenceTime').setValue(detail.occurrenceTime);
          this.validateForm.get('top').setValue(detail.top === 'true' ? '1' : '0');
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, this.NameLength]],
      remark: [null, [Validators.required]],
      eventLevel: [null, [Validators.required]],
      materials: [null, [Validators.required]],
      occurrenceTime: [null, [Validators.required]],
      supplierId: [null, [Validators.required]],
      top: [0, []],
    });
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
  time = '';
  dateChange(e: Date) {
    this.time = e.getFullYear() + '-' + ('00' + (e.getMonth() + 1)).substr(-2) + '-' + ('00' + e.getDate()).substr(-2);
  }
  NameLength = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.length > 60) {
      return { length: true, error: true };
      // control.value
    }
  }

  openFile() {
    if (this.upLoading) {
      return this._message.create('info', '文件上传中，请稍后')
    }
    document.getElementById('file').click()
  }
  uploadFile(element) {
    if (!element.target.files.length) {
      return
    }
    let file = element.target.files[0];
    let param = new FormData();
    console.log(param)
    param.append('file', file, file.name);
    //param.append('chunk','0'); 
    // if(param.get('file')['size'] > 2 * 1024 * 1024){
    //   return  this._message.create('info', '回复文件不能大于2M', { nzDuration: 4000 });
    // }
    let a = param.get('file')['type']
    if (a != 'image/png' && a != 'image/jpeg' && a != 'image/gif' && a != 'image/bmp') {
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
      if (res.errorCode == 0) {
        // res.data.fileUrl
        this.validateForm.get('face').setValue(res.data.fileUrl.replace(/\//, '%2f'));
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
        supplierId: this.validateForm.value.supplierId,
        remark: this.validateForm.value.remark,
        eventLevel: this.validateForm.value.eventLevel,
        materials: this.validateForm.value.materials,
        occurrenceTime: this.time,
        content: this.validateForm.value.content,
        top: Number(this.validateForm.value.top),
        status: 0,
      }
      if (this.id) {
        data['id'] = this.id;
      }
      if (k) {
        data['status'] = 1
      }

      this.qualityEventService.addAndUpdate({
        data: data
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/quality/accident']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }

}
