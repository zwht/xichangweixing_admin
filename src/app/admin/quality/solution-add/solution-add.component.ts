import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/share/restServices/file.service';
import { QualityDealService } from 'src/app/share/restServices/quality-deal.service';
import { SupplierService } from 'src/app/share/restServices/supplier.service';

@Component({
  selector: 'app-solution-add',
  templateUrl: './solution-add.component.html',
  styleUrls: ['./solution-add.component.less']
})
export class SolutionAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = '新增时间';
  roleList = [];
  id = 0;
  upLoading = false;
  showEdit = true;
  preivewShow = false;
  preivewHtml;
  readOnlyText;

  categorysFoundId = [];
  dealStartTime = '';
  supplierList = [];
  dealEndTime = '';
  fileList = [];
  constructor(
    private supplierService: SupplierService,
    private qualityDealService: QualityDealService,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private _message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      remark: [null, [Validators.required]],
      materials: [null, [Validators.required]],
      dealEndTime: [null, [Validators.required]],
      dealStartTime: [null, [Validators.required]],
      supplierId: [null, [Validators.required]],
      top: [null, []],
    });
    if (this.router.url.indexOf('edit') > -1) {
      this.title = '编辑事件';
      this.id = this.route.snapshot.params['id'];
      this.qualityDealService['getById']({
        params: {
          params2: this.id,
        }
      }).subscribe(response => {
        this.loading = false;
        if (response.errorCode === 0) {
          const detail = response.data;
          this.showEdit = false;
          if (detail.status === 1) {
            this.readOnlyText = this.sanitizer.bypassSecurityTrustHtml(detail.content);
            this.title = '查看事件';
          }
          this.validateForm.get('top').setValue(detail.flag === 'true' ? '1' : '0');
          this.validateForm.get('remark').setValue(detail.remark);
          this.validateForm.get('supplierId').setValue(detail.supplierId);
          this.validateForm.get('materials').setValue(detail.materials);
          this.validateForm.get('dealStartTime').setValue(new Date(detail.dealStartTime));
          this.validateForm.get('dealEndTime').setValue(new Date(detail.dealEndTime));

          if (detail.fileUrl) {
            const fl = [];
            detail.fileUrl.split('&*&*&').forEach(item => {
              if (item) {
                const bb = item.split('%#%$%');
                fl.push({
                  uid: bb[0],
                  name: bb[1],
                  url: bb[0],
                  status: 'done',
                });
              }
            });
            this.fileList = fl;
          }
        } else {
          this._message.create('error', response.msg, { nzDuration: 4000 });
        }
      });
    }
    this.getIndustry();
  }
  getIndustry() {
    this.supplierService.getAllByQuery({
      params: {
        pageNumber: 1,
        pageSize: 1000,
      }
    }).subscribe(res => {
      this.supplierList = res.data.pageData;
    });
  }

  dateChange(e: Date) {
    this.dealEndTime = e.getFullYear() + '-' + ('00' + (e.getMonth() + 1)).substr(-2) + '-' + ('00' + e.getDate()).substr(-2);
  }
  dateChange2(e: Date) {
    this.dealStartTime = e.getFullYear() + '-' + ('00' + (e.getMonth() + 1)).substr(-2) + '-' + ('00' + e.getDate()).substr(-2);
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
      return this._message.create('info', '文件上传中，请稍后');
    }
    document.getElementById('file').click();
  }
  uploadFile = (file) => {
    const param = new FormData();
    param.append('file', file, file.name);
    this.upLoading = true;
    this.fileService.add({
      data: param
    }).subscribe(res => {
      this.upLoading = false;
      if (res.errorCode === 0) {
        this.fileList.push({
          uid: new Date().getTime(),
          name: file.name,
          url: res.data.fileUrl.replace(/\//, '%2f'),
          status: 'done',
        });
        this.fileList.filter(item => {
          if (item.status === 'removed') {
            return false;
          } else {
            return true;
          }
        });
        this.fileList = [...this.fileList.filter(item => {
          if (item.status === 'removed') {
            return false;
          } else {
            return true;
          }
        })];
      }
    });
    return false;
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
      const data = {
        remark: this.validateForm.value.remark,
        supplierId: this.validateForm.value.supplierId,
        materials: this.validateForm.value.materials,
        dealEndTime: this.dealEndTime,
        dealStartTime: this.dealStartTime,
        content: this.validateForm.value.content,
        top: Number(this.validateForm.value.top),
        fileUrl: this.fileList.reduce((pr, item) => {
          if (item.status !== 'removed') {
            pr += item.url + '%#%$%' + item.name + '&*&*&';
          }
          return pr;
        }, ''),
        status: 0,
      };
      if (this.id) {
        data['id'] = this.id;
      }
      if (k) {
        data['status'] = 1;
      }

      this.qualityDealService.addAndUpdate({
        data: data
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/quality/solution']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }
}
