import { NgModule } from '@angular/core';
import { NoticeComponent } from './notice/notice.component';
import { AccidentComponent } from './accident/accident.component';
import { SolutionComponent } from './solution/solution.component';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuardService } from 'src/app/share/services/permission-guard.service';
import { ShareModule } from 'src/app/share/share.module';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { AccidentAddComponent } from './accident-add/accident-add.component';
import { SolutionAddComponent } from './solution-add/solution-add.component';

export const routes: Routes = [
    {
        path: 'notice',
        component: NoticeComponent,
        data: {
            name: '质量通知公告',
            menu: true
        },
        canActivate: [PermissionGuardService]
    },
    {
        path: 'notice/add',
        component: NoticeAddComponent,
        data: {
            name: '新增质量通知公告',
        },
        canActivate: [PermissionGuardService]
    },
    {
        path: 'notice/edit/:id',
        component: NoticeAddComponent,
        data: {
            name: '编辑质量通知公告',
        },
        canActivate: [PermissionGuardService]
    },
  {
      path: 'accident',
      component: AccidentComponent,
      data: {
          name: '质量事件管理',
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'accident/add',
      component: AccidentAddComponent,
      data: {
          name: '新增质量事件',
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'accident/edit/:id',
      component: AccidentAddComponent,
      data: {
          name: '编辑质量事件',
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'solution',
      component: SolutionComponent,
      data: {
          name: '质量问题处理管理',
          menu: true
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'solution/add',
      component: SolutionAddComponent,
      data: {
          name: '新增质量问题处理',
      },
      canActivate: [PermissionGuardService]
  },
  {
      path: 'solution/edit/:id',
      component: SolutionAddComponent,
      data: {
          name: '编辑质量问题处理',
      },
      canActivate: [PermissionGuardService]
  },
]
@NgModule({
  declarations: [NoticeComponent, AccidentAddComponent ,NoticeAddComponent,AccidentComponent, SolutionComponent, SolutionAddComponent],
  imports: [
      ShareModule,
      RouterModule.forChild(routes)
  ]
})
export class QualityModule { }
