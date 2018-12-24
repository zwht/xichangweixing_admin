import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';


import { MenuComponent } from './common/components/menu/menu.component';
import { PermissionGuardService } from '../share/services/permission-guard.service';
import { SelfComponent } from './self/index.component';
import { NewsComponent } from './news/news.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { PartyMsgComponent } from './party-msg/party-msg.component';
import { PartyMsgAddComponent } from './party-msg-add/party-msg-add.component';
import { WorkMsgComponent } from './work-msg/work-msg.component';
import { WorkMsgAddComponent } from './work-msg-add/work-msg-add.component';
import { MarketMsgComponent } from './market-msg/market-msg.component';
import { MarketMsgAddComponent } from './market-msg-add/market-msg-add.component';
import { ManageRuleComponent } from './manage-rule/manage-rule.component';
import { ManageRuleAddComponent } from './manage-rule-add/manage-rule-add.component';
import { ComplainComponent } from './complain/complain.component';
import { ComplainDetailComponent } from './complain-detail/complain-detail.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { DownloadListAddComponent } from './download-list-add/download-list-add.component';
import { OutlinkComponent } from './outlink/outlink.component';
import { OutlinkAddComponent } from './outlink-add/outlink-add.component';
import { SelfChangePwdComponent } from './self-change-pwd/self-change-pwd.component';
import { SelfMessageComponent } from './self-message/self-message.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
          path: 'news',
          component: NewsComponent,
          data: {
              name: '新闻管理',
              menu: true
          }
      },
      {
          path: 'party-msg',
          component: PartyMsgComponent,
          data: {
              name: '党建管理',
              menu: true
          }
      },
      {
        path: 'infomation',
        loadChildren: './infomation/infomation.module#InfomationModule',
        data: {
          name: '信息查询管理',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'quality',
        loadChildren: './quality/quality.module#QualityModule',
        data: {
          name: '质量专栏管理',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'logistics',
        loadChildren: './logistics/logistics.module#LogisticsModule',
        data: {
          name: '后勤保障管理',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
          path: 'work-msg',
          component: WorkMsgComponent,
          data: {
              name: '工作动态管理',
              menu: true
          }
      },
      {
          path: 'market-msg',
          component: MarketMsgComponent,
          data: {
              name: '市场信息管理',
              menu: true
          }
      },
      {
          path: 'manage-rule',
          component: ManageRuleComponent,
          data: {
              name: '管理规定管理',
              menu: true
          }
      },
      {
          path: 'complain',
          component: ComplainComponent,
          data: {
              name: '投诉举报管理',
              menu: true
          }
      },
      {
          path: 'download-list',
          component: DownloadListComponent,
          data: {
              name: '资料下载管理',
              menu: true
          }
      },
      {
          path: 'outlink',
          component: OutlinkComponent,
          data: {
              name: '相关外链管理',
              menu: true
          }
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
        data: {
          name: '用户管理',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
          path: 'self',
          component: SelfComponent,
          data: {
              name: '个人中心',
              menu: true
          }
      },
    ]
  }
];

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MenuComponent,
    NewsComponent, 
    NewsAddComponent, 
    PartyMsgComponent, 
    PartyMsgAddComponent, 
    WorkMsgComponent, 
    WorkMsgAddComponent, 
    MarketMsgComponent, 
    MarketMsgAddComponent, 
    ManageRuleComponent, 
    ManageRuleAddComponent, 
    ComplainComponent, 
    ComplainDetailComponent, 
    DownloadListComponent, 
    DownloadListAddComponent, 
    OutlinkComponent, 
    OutlinkAddComponent, 
    SelfComponent,
    SelfChangePwdComponent, 
    SelfMessageComponent
  ]
})
export class AdminModule { }