import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share/restServices/user.service';
import { SessionService } from 'src/app/share/services/session.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-self-change-pwd',
  templateUrl: './self-change-pwd.component.html',
  styleUrls: ['./self-change-pwd.component.less']
})
export class SelfChangePwdComponent implements OnInit {
  password = null;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
    private msg: NzMessageService
  ) { }
  ngOnInit() {
  }
  save() {
    this.userService.updatePassword({
      params: {
        password: this.password,
        userId: this.sessionService.getItem('id')
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.msg.success('修改成功');
          this.sessionService.removeItem('token');
          this.sessionService.removeItem('username');
          this.sessionService.removeItem('remember');
          this.sessionService.removeItem('password');
          this.sessionService.removeItem('id');
          this.sessionService.removeItem('roles');
          this.router.navigate(['/']);
        } else {
          this.msg.error('修改失败');
        }
      });
  }
}
