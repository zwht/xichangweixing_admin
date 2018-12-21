import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { AccidentComponent } from './accident/accident.component';
import { SolutionComponent } from './solution/solution.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';

export const routes: Routes = [
  {
      path: 'equipment',
      component: NoticeComponent,
      data: {
          name: '质量通知公告',
          roles: [1001],
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'supplier',
      component: AccidentComponent,
      data: {
          name: '质量事件管理',
          roles: [1001],
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'bids',
      component: SolutionComponent,
      data: {
          name: '质量问题处理管理',
          roles: [1001],
          menu: true
      },
      canActivate: [PermissionGuardService]
  }
]
@NgModule({
    imports: [
      ShareModule,
      RouterModule.forChild(routes)
    ],
  declarations: [NoticeComponent, AccidentComponent, SolutionComponent]
})
export class QualityModule { }
