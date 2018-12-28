import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../share/services/session.service';
import { EquipmentService } from '../../../../share/restServices/equipment.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-importequipment',
  templateUrl: './importequipment.component.html',
  styleUrls: ['./importequipment.component.less']
})
export class ImportequipmentComponent implements OnInit {
  excle = '';

  constructor(
    private sessionService: SessionService,
    private message: NzMessageService,
    private equipmentService: EquipmentService,
  ) { }

  ngOnInit() {
  }

  fileChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    this.equipmentService['readExcel']({
      data: formData
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          debugger
        } else {
          this.message.create('error', '错误!错误代码' + response.errorCode);
        }
      });
  }

  chooseType() {
    document.getElementById('upload_file1').click();
  }

  down() {
    const aaa = this.sessionService.getItem('token');
    window.open('/v1/equipment/getExport?Authorization=' + aaa);
  }

}
