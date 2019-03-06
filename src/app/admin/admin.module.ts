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
import { ArmMsgComponent } from './arm-msg/arm-msg.component';
import { ArmMsgAddComponent } from './arm-msg-add/arm-msg-add.component';
import { PNoticeComponent } from './p-notice/p-notice.component';
import { PNoticeAddComponent } from './p-notice-add/p-notice-add.component';

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
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'news/add',
                component: NewsAddComponent,
                data: {
                    name: '新增新闻',
                    menu: false
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'news/edit/:id',
                component: NewsAddComponent,
                data: {
                    name: '编辑新闻',
                    menu: false
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'party-msg',
                component: PartyMsgComponent,
                data: {
                    name: '党建管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'party-msg/add',
                component: PartyMsgAddComponent,
                data: {
                    name: '新增党建要闻',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'party-msg/edit/:id',
                component: PartyMsgAddComponent,
                data: {
                    name: '编辑党建要闻',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'arm-msg',
                component: ArmMsgComponent,
                data: {
                    name: '强军管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'arm-msg/add',
                component: ArmMsgAddComponent,
                data: {
                    name: '新增强军要闻',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'arm-msg/edit/:id',
                component: ArmMsgAddComponent,
                data: {
                    name: '编辑强军要闻',
                },
                canActivate: [PermissionGuardService]
            },

            {
                path: 'pnotice',
                component: PNoticeComponent,
                data: {
                    name: '通知公告',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'pnotice/add',
                component: PNoticeAddComponent,
                data: {
                    name: '新增通知公告',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'pnotice/edit/:id',
                component: PNoticeAddComponent,
                data: {
                    name: '编辑通知公告',
                },
                canActivate: [PermissionGuardService]
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
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'work-msg/add',
                component: WorkMsgAddComponent,
                data: {
                    name: '新增工作动态',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'work-msg/edit/:id',
                component: WorkMsgAddComponent,
                data: {
                    name: '编辑工作动态',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'market-msg',
                component: MarketMsgComponent,
                data: {
                    name: '市场信息管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'market-msg/add',
                component: MarketMsgAddComponent,
                data: {
                    name: '新增市场信息',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'market-msg/edit/:id',
                component: MarketMsgAddComponent,
                data: {
                    name: '编辑市场信息',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'manage-rule',
                component: ManageRuleComponent,
                data: {
                    name: '管理规定管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'manage-rule/add',
                component: ManageRuleAddComponent,
                data: {
                    name: '新增管理规定',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'manage-rule/edit/:id',
                component: ManageRuleAddComponent,
                data: {
                    name: '编辑管理规定',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'complain',
                component: ComplainComponent,
                data: {
                    name: '投诉举报管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'complain/detail/:id',
                component: ComplainDetailComponent,
                data: {
                    name: '投诉举报详情',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'download-list',
                component: DownloadListComponent,
                data: {
                    name: '资料下载管理',
                    menu: true
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'download-list/add',
                component: DownloadListAddComponent,
                data: {
                    name: '新增下载资料',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'download-list/edit/:id',
                component: DownloadListAddComponent,
                data: {
                    name: '编辑下载资料',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'outlink',
                component: OutlinkComponent,
                data: {
                    name: '相关外链管理',
                    menu: true,
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'outlink/add',
                component: OutlinkAddComponent,
                data: {
                    name: '新增外部链接',
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'outlink/edit/:id',
                component: OutlinkAddComponent,
                data: {
                    name: '编辑外部链接',
                },
                canActivate: [PermissionGuardService]
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
                },
                canActivate: [PermissionGuardService]
            },
            {
                path: 'self/uppaswd',
                component: SelfChangePwdComponent,
                data: {
                    name: '修改密码',
                    menu: false
                },
                canActivate: [PermissionGuardService]
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
        PNoticeComponent,
        PNoticeAddComponent,
        DownloadListComponent,
        ArmMsgComponent,
        ArmMsgAddComponent,
        DownloadListAddComponent,
        OutlinkComponent,
        OutlinkAddComponent,
        SelfComponent,
        SelfChangePwdComponent,
        SelfMessageComponent
    ]
})
export class AdminModule { }
