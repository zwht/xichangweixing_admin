import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../../../share/restServices/equipment.service';
import { SupplierService } from '../../../../share/restServices/supplier.service';
import { FileService } from '../../../../share/restServices/file.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  title = '新增设备资产';
  id = ''; // id
  code = ''; // 设备编号
  name = ''; // 设备名称
  format = ''; // 规格
  packageFormat = ''; // 包装规格
  measurement = ''; // 计量单位
  standard = ''; // 标准或批号
  manufactureDate = null; // 生产日期
  validity = null; // 有效期
  supplierNum: number; // 供应商值
  fileHose = true;
  supplier = [{
    id: '', // 供应商id
    name: '' // 供应商名字
  }];
  model = ''; // 型号
  leadingPerson = ''; // 采购负责人
  images = ''; // 图片
  remark = ''; // 备注
  imgName = null; // 图片名字
  fileUrl = ''; // 图片

  imgzs = { src: '../../../../../assets/images/moren/moren.jpg' }; // 图片展示

  constructor(
    private router: Router,
    private message: NzMessageService,
    private equipmentService: EquipmentService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSupplier();
    this.whetherAdd();
  }
  whetherAdd() {
    if (this.id === 'add') {
      return;
    } else {
      this.title = '修改设备资产';
    }
  }

  chooseType() {
    document.getElementById('upload_file1').click();
  }

  fileChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    this.fileHose = false;
    this.fileService['uploadHead']({
      data: formData
    })
      .subscribe(response => {
        this.fileHose = true;
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

  getByID() {
    this.equipmentService['getById']({
      params: {
        params2: this.id
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.code = response.data.code;
          this.name = response.data.name;
          this.format = response.data.format;
          this.packageFormat = response.data.packageFormat;
          this.measurement = response.data.measurement;
          this.standard = response.data.standard;
          this.manufactureDate = response.data.manufactureDate;
          this.validity = response.data.validity;
          this.leadingPerson = response.data.leadingPerson;
          this.model = response.data.model;
          for (let index = 0; index < this.supplier.length; index++) {
            if (this.supplier[index].id === response.data.supplierId) {
              this.supplierNum = index;
            }
          }
          this.remark = response.data.remark;
          if (response.data.images !== '') {
            this.filedown(response.data.images);
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  getSupplier() {
    this.supplierService['getAllByQuery']({
      params: {
        pageNumber: 1,
        pageSize: 9999
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.supplier = response.data.pageData;
          if (this.id !== 'add') {
            this.getByID();
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
    }
    this.equipmentService['saveOrUpdate']({
      data: {
        equipType: 1,
        equipTypeName: '三蛋',
        code: this.code,
        name: this.name,
        format: this.format,
        packageFormat: this.packageFormat,
        measurement: this.measurement,
        standard: this.standard,
        manufactureDate: this.manufactureDate,
        validity: this.validity,
        supplierId: this.supplierNum ? this.supplier[this.supplierNum].id : '',
        supplierName: this.supplierNum ? this.supplier[this.supplierNum].name : '',
        images: this.fileUrl,
        remark: this.remark,
        model: this.model,
        leadingPerson: this.leadingPerson,
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
          this.goto('infomation/equipment', '');
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  jiancha() {
    if (this.code === '') {
      this.message.create('error', '请输入设备编号');
      return 1;
    }
    if (this.model === '') {
      this.message.create('error', '请输入设备型号');
      return 1;
    }
    if (this.name === '') {
      this.message.create('error', '请输入设备名称');
      return 1;
    }
    if (this.format === '') {
      this.message.create('error', '请输入规格');
      return 1;
    }
    if (this.packageFormat === '') {
      this.message.create('error', '请输入包装规格');
      return 1;
    }
    if (this.measurement === '') {
      this.message.create('error', '请输入计量单位');
      return 1;
    }
    if (this.standard === '') {
      this.message.create('error', '请输入标准或批号');
      return 1;
    }
    if (this.leadingPerson === '') {
      this.message.create('error', '采购负责人');
      return 1;
    }
    if (this.manufactureDate === '') {
      this.message.create('error', '请选择生产日期');
      return 1;
    }
    if (this.validity === '') {
      this.message.create('error', '请选择有效期');
      return 1;
    }
    if (this.supplierNum === null) {
      this.message.create('error', '请选择供应商');
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
