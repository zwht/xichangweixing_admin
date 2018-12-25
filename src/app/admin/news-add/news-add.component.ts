import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/share/restServices/news.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.less']
})
export class NewsAddComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];
  title = "新增新闻";
  roleList = [];
  id = 0;

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
  preivewShow = false;
  preivewHtml;

  categorysFoundId = [];
  constructor(
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
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
    // if(this.router.url.indexOf("edit")>-1){
    //   this.title = '编辑惠民政策'
    //   this.id = this.route.snapshot.params['id'];
    //   this.newsService['getPolicyById']({
    //     params:{
    //       policyId: this.id,
    //     }
    //   }).subscribe(response => {
    //     this.loading = false;
    //     if (response.errorCode === 0) { 
    //       let detail = response.data;
    //       this.validateForm.get('name').setValue(detail.name);
    //       this.validateForm.get('content').setValue(detail.detail);
    //       this.validateForm.get('publishDateTime').setValue(new Date(detail.publishDateTime));
    //       this.validateForm.get('qualification').setValue(detail.qualification);
    //       this.validateForm.get('standard').setValue(detail.standard);
    //       this.validateForm.get('categoryFundsNames').setValue(detail.categoryFundsNames.join(','));
    //       this.categorysFoundId = detail.categorysFoundId;

    //       this.validateForm.get('town').setValue(detail.town);
    //       this.validateForm.get('payment').setValue(detail.payment);
    //       this.validateForm.get('payProcess').setValue(detail.payProcess);
    //       this.validateForm.get('departmentPhone').setValue(detail.departmentPhone);
    //     } else {
    //       this._message.create('error', response.msg, { nzDuration: 4000 });
    //     }
    //   });
    // }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required,this.NameLength]],
      content: [null, [Validators.required]],
      publishDateTime: [null, [Validators.required]],
      qualification: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      categoryFundsNames: [null, [Validators.required]],
      town: [null, []],
      payment: [null, []],
      payProcess: [null, []],
      departmentPhone: [null, []],
    });
  }
  // 选择资金类别
  treeList = [];
  selectCategoryShow = false;
  currentList = [];
  
  NameLength = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.length>60) {
      return { length: true, error: true };
      // control.value
    }
  }

  selectCategory() {
    this.currentList = [];
    for (let o of this.treeList) {
      for (let vos of o.fundsVOS) {
        if (this.categorysFoundId.indexOf(vos.id) >= 0) {
          this.currentList.push(JSON.parse(JSON.stringify(vos)));
          vos.cur = true;
        } else {
          vos.cur = false;
        }
      }
    }
    this.selectCategoryShow = true;
  }
  selectThis(v) {
    if (v.cur) {
      v.cur = false;
      this.currentList = this.currentList.filter((o) => {
        return o.id != v.id
      })
    } else {
      v.cur = true;
      this.currentList.push(JSON.parse(JSON.stringify(v)));
    }
  }
  selectCategoryOk() {
    let string = "";
    this.categorysFoundId = [];
    for (let o of this.currentList) {
      this.categorysFoundId.push(o.id);
      if (string == "") {
        string = o.fundsName
      } else {
        string += "," + o.fundsName
      }
    }
    this.validateForm.get('categoryFundsNames').setValue(string);
    this.selectCategoryShow = false;
  }
  selectCategoryCancel() {
    this.selectCategoryShow = false;
  }

  preview() {
    this.preivewHtml = this.sanitizer.bypassSecurityTrustHtml(this.validateForm.value.content);
    this.preivewShow = true;
  }
  previewClose() {
    this.preivewHtml = this.sanitizer.bypassSecurityTrustHtml('');
    this.preivewShow = false;
  }
  submitForm(): void {
    // 验证表单
    for (const i in this.validateForm.controls) {
      if ((this.validateForm as any).controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.valid) {
      this.loading = true;
      this.newsService.addAndUpdate({
        data: {
          id: this.id ? this.id : '',
          name: this.validateForm.value.name,
          detail: this.validateForm.value.content,
          departmentPhone: this.validateForm.value.departmentPhone,
          payProcess: this.validateForm.value.payProcess,
          payment: this.validateForm.value.payment,
          standard: this.validateForm.value.standard,
          qualification: this.validateForm.value.qualification,
          publishDateTime: this.validateForm.value.publishDateTime.getTime(),
          categorysFoundId: this.categorysFoundId,
          categoryFundsNames: this.validateForm.value.categoryFundsNames.split(','),
          district: this.region.cityCode,//市区写死
          country: this.region.countyCode,//区县写死
          town: this.validateForm.value.town,//乡镇选择
        }
      })
        .subscribe(response => {
          this.loading = false;
          if (response.errorCode === 0) {
            this.router.navigate(['/admin/data/policy-data']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }
  getTownName(){
    const len = this.townList.length
    for(let i = 0;i < len; i++){
      if(this.townList[i].townCode == this.validateForm.value.town){
        return this.townList[i].townName
      }
    }
    return false
  }

}
