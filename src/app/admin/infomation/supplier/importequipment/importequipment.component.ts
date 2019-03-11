import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../share/services/session.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/share/restServices/supplier.service';

@Component({
  selector: 'app-importequipment',
  templateUrl: './importequipment.component.html',
  styleUrls: ['./importequipment.component.less']
})
export class ImportSupplierComponent implements OnInit {
  excle = '';
  dataHead = [];
  dataMessage = [];
  fuckK = true;
  dataSet: Array<{
    code: String;
    equipTypeName: String;
    format: String;
    leadingPerson: String;
    manufactureDate: String;
    measurement: String;
    model: String;
    name: String;
    packageFormat: String;
    remark: String;
    standard: String;
    supplierName: String;
    validity: String;
  }>;
  isLoadingOne = false;
  redisKey = '';
  OJBK = true;


  constructor(
    private sessionService: SessionService,
    private message: NzMessageService,
    private supplierService: SupplierService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  fileChange(e) {
    this.OJBK = true;
    this.isLoadingOne = true;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    this.fuckK = false;
    this.supplierService['readExcel']({
      data: formData
    })
      .subscribe(response => {
        this.fuckK = true;
        if (response.errorCode === 0) {
          if (response.data.messages.length === 0) {
            this.dataHead = response.data.head;
            this.dataSet = response.data.data;
            this.redisKey = response.data.redisKey;
            this.OJBK = false;
          } else {
            this.dataMessage = response.data.messages;
          }
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
        this.isLoadingOne = false;
      });
  }

  shangchuan() {
    this.supplierService['importData']({
      data: {
        redisKey: this.redisKey,
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.message.create('success', '成功');
          this.router.navigate(['admin/infomation/supplier']);
        } else {
          const srt = response.data.reduce((pr, item) => {
            pr += item;
            return pr;
          }, '');
          this.message.create('error', srt);
        }
      });
  }

  chooseType() {
    document.getElementById('upload_file1').click();
  }

  down() {
    const aaa = this.sessionService.getItem('token');
    window.open('/v1/supplier/getExport?Authorization=' + aaa);
  }

}
