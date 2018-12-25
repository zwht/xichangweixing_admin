import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.less']
})
export class SupplierAddComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }
  chooseType() {
    document.getElementById('upload_file1').click();
  }
}
