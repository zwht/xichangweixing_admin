import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '../../../share/restServices/user.service';
import { NzMessageService } from '../../../../../node_modules/ng-zorro-antd';
import { RegExpService } from '../../../share/services/reg-exp.service';
import { CodeDataService } from '../../../share/services/code-data.service';
import { Router } from '@angular/router';
import { GroupService } from '../../../share/restServices/group.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../common/style/add.less', './add.component.less']
})
export class AddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  checkOptionsOne = [];
  parentIdList = [];

  constructor(
    private groupService: GroupService,
    private codeDataService: CodeDataService,
    private _message: NzMessageService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.codeDataService && this.codeDataService.codeObjList['10']) {
      this.checkOptionsOne = JSON.parse(JSON.stringify(this.codeDataService.codeObjList['10']));
      this.checkOptionsOne = this.checkOptionsOne.filter(item => {
        return item.code !== 1001;
      });
      if (this.checkOptionsOne[0]) {
        this.checkOptionsOne[0].checked = true;
      }
    }

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      loginName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remark: [null, []],      
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if ((this.validateForm as any).controls[i]) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.valid) {
      this.loading = true;

      const roles = this.checkOptionsOne.filter(item => {
        if (item.checked) {
          return true;
        }
      }).map(item => {
        return item.code;
      });
      this.userService['add']({
        data: {
          loginName: this.validateForm.value.loginName,
          name: this.validateForm.value.name,
          // password: btoa(encodeURIComponent(this.validateForm.value.password)),
          password: this.validateForm.value.password,
          phone: this.validateForm.value.phone,
          remark: this.validateForm.value.remark,
        }
      })
        .subscribe(response => {
          this.loading = false;
          if (response.code === 200) {
            // this.checkOptionsOne.forEach(bbb => {
            //   bbb.checked = false;
            // });
            this._message.create('success', '创建成功', { nzDuration: 4000 });
            this.router.navigate(['/admin/user']);
          } else {
            this._message.create('error', response.msg, { nzDuration: 4000 });
          }
        });
    }
  }

  setRoles(roles) {
    let miao = '';
    roles.forEach(aaa => {
      miao = miao + ',' + aaa;
    });
    miao = miao.substr(1);
    return miao;
  }
  getList() {
    this.groupService.list({
      params: {
        params2: 1,
        params3: 1000
      },
      data: {
      }
    })
      .subscribe(response => {
        if (response.code === 200) {
          this.parentIdList = response.data.pageData;
        }
      });
  }
}
