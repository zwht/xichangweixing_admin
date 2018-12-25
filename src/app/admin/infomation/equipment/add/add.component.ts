import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../../../../share/restServices/equipment.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  code = ''; // 设备编号
  name = ''; // 设备名称
  equipTypeNum = null; // 设备类型值
  equipType = 0; // 设备类型id
  equipTypeName = 'QWQ'; // 设备类型名字
  format = ''; // 规格
  packageFormat = ''; // 包装规格
  measurement = ''; // 计量单位
  standard = ''; // 标准或批号
  manufactureDate = ''; // 生产日期
  validity = ''; // 有效期
  supplierNum = null; // 供应商值
  supplierId = 0; // 供应商id
  supplierName = ''; // 供应商名字
  images = ''; // 图片
  remark = ''; // 备注

  constructor(
    private router: Router,
    private message: NzMessageService,
    private equipmentService: EquipmentService,
  ) { }

  ngOnInit() {
  }

  chooseType() {
    document.getElementById('upload_file1').click();
  }

  tianjia() {
    this.equipmentService['saveOrUpdate']({
      data: {
        code: this.code,
        name: this.name,
        equipType: this.equipTypeNum,
        equipTypeName: this.equipTypeName,
        format: this.format,
        packageFormat: this.packageFormat,
        measurement: this.measurement,
        standard: this.standard,
        manufactureDate: this.manufactureDate,
        validity: this.validity,
        supplierId: this.supplierNum,
        supplierName: this.supplierName,
        images: this.images,
        remark: this.remark
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.message.create('Success', '添加成功');
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });

  }
}
