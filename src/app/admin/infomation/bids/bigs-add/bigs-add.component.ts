import { Component, OnInit } from '@angular/core';
import { AdminDivisionService } from '../../../../share/restServices/admin-division.service';
import { BidsService } from '../../../../share/restServices/bids.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../share/restServices/file.service';

@Component({
  selector: 'app-bigs-add',
  templateUrl: './bigs-add.component.html',
  styleUrls: ['./bigs-add.component.less']
})
export class BigsAddComponent implements OnInit {
  id = '';
  title = '新增投标机构';

  code = ''; // 机构编号
  name = ''; // 机构名称

  provinceNum: string = null;
  cityNum: string = null;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = [];

  address = ''; // 详细地址
  socialCreditCode = ''; // 统一社会信用代码
  registDate = ''; // 注册日期
  legalPerson = ''; // 法人姓名
  legalPersonName = ''; // 请输入法人身份证号
  contactsUserName = ''; // 联系人姓名
  contactsUseIdnum = ''; // 联系人身份证号
  phone = '';
  grade = 0; // 评级
  remark = ''; // 备注
  region = '';

  imgzs = { src: '../../../../../assets/images/moren/moren.jpg' }; // 图片展示
  imgName = null; // 图片名字
  fileUrl = ''; // 图片

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bidsService: BidsService,
    private adminDivisionService: AdminDivisionService,
    private fileService: FileService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.whetherAdd();
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

  whetherAdd() {
    if (this.id === 'add') {
      this.getAdminDivision(1, '');
      return;
    } else {
      this.title = '修改投标机构';
      this.getByID();
    }
  }

  filedown(a) {
    this.fileUrl = a;
    this.imgzs.src = '/v1/file/downloadHead?fileUrl=' + a.replace(/\//, '%2f');
  }

  getByID() {
    this.bidsService['getById']({
      params: {
        params2: this.id
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.code = response.data.code; // 机构编号
          this.name = response.data.name; // 机构名称
          this.region = response.data.region;
          this.buyouya(this.region.split(',')[0]);
          this.address = response.data.address; // 详细地址
          this.socialCreditCode = response.data.socialCreditCode; // 统一社会信用代码
          this.registDate = response.data.registDate; // 注册日期
          this.legalPerson = response.data.legalPerson; // 法人姓名
          this.legalPersonName = response.data.legalPersonName; // 请输入法人身份证号
          this.contactsUserName = response.data.contactsUserName; // 联系人姓名
          this.contactsUseIdnum = response.data.contactsUseIdnum; // 联系人身份证号
          this.phone = response.data.phone;
          this.grade = response.data.grade; // 评级
          this.remark = response.data.remark; // 备注
          if (response.data.logo !== '') {
            this.filedown(response.data.logo);
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
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

  chooseType() {
    document.getElementById('upload_file1').click();
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
    }
    const cityName = this.city.filter(x => x.cityCode === this.cityNum)[0].cityName;
    const provinceName = this.province.filter(x => x.provinceCode === this.provinceNum)[0].provinceName;
    this.region = this.cityNum + ',' + provinceName + cityName;
    this.bidsService['saveOrUpdate']({
      data: {
        code: this.code,
        name: this.name,
        region: this.region,
        address: this.address,
        socialCreditCode: this.socialCreditCode,
        registDate: this.registDate,
        legalPerson: this.legalPerson,
        legalPersonName: this.legalPersonName,
        contactsUserName: this.contactsUserName,
        contactsUseIdnum: this.contactsUseIdnum,
        phone: this.phone,
        grade: this.grade,
        remark: this.remark,
        id: idddd,
        logo: this.fileUrl,
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          if (this.id === 'add') {
            this.message.create('Success', '添加成功');
          } else {
            this.message.create('Success', '修改成功');
          }
          this.goto('infomation/bids', '');
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  jiancha() {
    if (this.code === '') {
      this.message.create('error', '请输入机构编号');
      return 1;
    }
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
