import { Component, OnInit } from '@angular/core';
import { AdminDivisionService } from '../../../../share/restServices/admin-division.service';
import { SupplierTypeService } from '../../../../share/restServices/supplier-type.service';
import { FileService } from '../../../../share/restServices/file.service';
import { SupplierService } from '../../../../share/restServices/supplier.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.less']
})
export class SupplierAddComponent implements OnInit {
  id = '';
  title = '新增供应商';
  name = '';
  supplierType: Array<{ id: string, name: string }> = [];
  supplierTypeId = '1';
  provinceNum: string = null;
  cityNum: string = null;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = [];
  region = '';
  address = '';
  socialCreditCode = ''; // 统一社会信用代码
  registDate = '';
  legalPerson = '';
  legalPersonName = '';
  contactsUserName = '';
  contactsUseIdnum = '';
  phone = '';
  remark = '';

  imgzs = { src: '../../../../../assets/images/moren/moren.jpg' }; // 图片展示
  imgName = null; // 图片名字
  fileUrl = ''; // 图片

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private supplierTypeService: SupplierTypeService,
    private supplierService: SupplierService,
    private adminDivisionService: AdminDivisionService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.whetherAdd();
    this.getSupplierType();
  }
  whetherAdd() {
    if (this.id === 'add') {
      this.getAdminDivision(1, '');
      return;
    } else {
      this.title = '修改供应商';
      this.getByID();
    }
  }

  fileChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    this.fileService['uploadHead']({
      data: formData
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.message.create('Success', '添加成功');
          this.imgName = file.name;
          this.fileUrl = response.data.fileUrl;
          const that = this;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            that.imgzs = file;
          };
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  filedown(a) {
    this.fileUrl = a;
    this.imgzs.src = '/v1/file/downloadHead?fileUrl=' + a.replace(/\//, '%2f');
  }

  getAdminDivision(level, id) {
    if (id == null) {
      this.city = [];
      this.cityNum = null;
      return;
    }
    this.adminDivisionService['list']({
      params: {
        params2: 1,
        params3: 9999
      },
      data: {
        provinceCode: id,
        level: level
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          if (level === 1) {
            this.province = response.data.pageData;
          } else {
            this.city = [];
            this.cityNum = null;
            this.city = response.data.pageData;
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  buyouya(id) {
    if (id === '') {
      return;
    }
    this.adminDivisionService['list']({
      params: {
        params2: 1,
        params3: 9999
      },
      data: {
        cityCode: id,
        level: 2
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          // this.provinceNum = response.data.pageData[0].provinceCode;
          // this.cityNum = response.data.pageData[0].cityCode;
          this.adminDivisionService['list']({
            params: {
              params2: 1,
              params3: 9999
            },
            data: {
              level: 1
            }
          })
            .subscribe(res => {
              if (res.errorCode === 0) {
                this.province = res.data.pageData;
                this.provinceNum = response.data.pageData[0].provinceCode;
                // setTimeout(() => {
                //     this.cityNum = response.data.pageData[0].cityCode;
                // }, 1000);
                this.adminDivisionService['list']({
                  params: {
                    params2: 1,
                    params3: 9999
                  },
                  data: {
                    level: 2
                  }
                })
                  .subscribe(r => {
                    this.city = r.data.pageData;
                    this.cityNum = response.data.pageData[0].cityCode;
                  });
              } else {
                this.message.create('error', '错误!错误代码' + res.errorCode);
              }
            });
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  getSupplierType() {
    this.supplierTypeService['getAll']({
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.supplierType = response.data;
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  chooseType() {
    document.getElementById('upload_file1').click();
  }

  getByID() {
    this.supplierService['getById']({
      params: {
        params2: this.id
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.name = response.data.name;
          this.supplierTypeId = response.data.type;
          this.region = response.data.region;
          this.buyouya(this.region.split(',')[0]);
          this.address = response.data.address;
          this.socialCreditCode = response.data.socialCreditCode;
          this.registDate = response.data.registDate;
          this.legalPerson = response.data.legalPerson;
          this.legalPersonName = response.data.legalPersonName;
          this.contactsUserName = response.data.contactsUserName;
          this.contactsUseIdnum = response.data.contactsUseIdnum;
          this.phone = response.data.phone;
          this.remark = response.data.remark;
          if (response.data.logo !== '') {
            this.filedown(response.data.logo);
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  tianjia() {
    if (this.jiancha() === 1) {
      return;
    }
    let idddd;
    if (this.id === 'add') {
      idddd = '';
    } else {
      idddd = this.id;
      const cityName = this.city.filter(x => x.cityCode === this.cityNum)[0].cityName;
      const provinceName = this.province.filter(x => x.provinceCode === this.provinceNum)[0].provinceName;
      this.region = this.cityNum + ',' + provinceName + cityName;
    }
    this.supplierService['saveOrUpdate']({
      data: {
        name: this.name,
        type: this.supplierTypeId,
        typeName: this.supplierType.filter(x => x.id === this.supplierTypeId)[0].name,
        region: this.region,
        address: this.address,
        socialCreditCode: this.socialCreditCode,
        registDate: this.registDate,
        legalPerson: this.legalPerson,
        legalPersonName: this.legalPersonName,
        contactsUserName: this.contactsUserName,
        contactsUseIdnum: this.contactsUseIdnum,
        phone: this.phone,
        logo: this.fileUrl,
        remark: this.remark,
        id: idddd
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          if (this.id === 'add') {
            this.message.create('Success', '添加成功');
          } else {
            this.message.create('Success', '修改成功');
          }
          this.goto('infomation/supplier', '');
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  jiancha() {
    if (this.name === '') {
      this.message.create('error', '请输入供应商名称');
      return 1;
    }
    if (this.provinceNum === null) {
      this.message.create('error', '请选择省份');
      return 1;
    }
    if (this.cityNum === null) {
      this.message.create('error', '请选择城市');
      return 1;
    }
    if (this.address === '') {
      this.message.create('error', '请输入详细地址');
      return 1;
    }
    if (this.socialCreditCode === '') {
      this.message.create('error', '请输入统一社会信用代码');
      return 1;
    }
    if (this.registDate === '') {
      this.message.create('error', '请选择注册日期');
      return 1;
    }
    if (this.legalPerson === '') {
      this.message.create('error', '请输入法人姓名');
      return 1;
    }
    if (this.legalPersonName === '') {
      this.message.create('error', '请输入法人身份证');
      return 1;
    }
    if (this.contactsUserName === '') {
      this.message.create('error', '请输入联系人姓名');
      return 1;
    }
    if (this.contactsUseIdnum === '') {
      this.message.create('error', '请输入联系人身份证');
      return 1;
    }
    if (this.phone === '') {
      this.message.create('error', '请输入联系电话');
      return 1;
    }
    if (this.remark === '') {
      this.message.create('error', '请输入备注');
      return 1;
    }
    return 0;
  }
  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
  }
}
