import { Component, OnInit } from '@angular/core';
import * as user from '../../../user/user.module';
import * as infomation from '../../../infomation/infomation.module';
import * as quality from '../../../quality/quality.module';
import * as logistics from '../../../logistics/logistics.module';
import { Router } from '@angular/router';
import { SessionService } from '../../../../share/services/session.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
    providers: []
})
export class MenuComponent implements OnInit {
    menuLocation = true;
    childrenShowKey = true;
    menu = [];
    collectKey = false;
    hardImg = '';
    userName = this.sessionService.getItem('userName');
    // 有子菜单的需要引入
    routesMenu = [
        {
            name: '用户管理',
            children: user.routes
        },
        {
            name: '信息查询管理',
            children: infomation.routes
        },
        {
            name: '质量专栏管理',
            children: quality.routes
        },
        {
            name: '后勤保障管理',
            children: logistics.routes
        }
    ];
    rightDown = [
        {
            value: 'my',
            label: '个人中心',
        },
        {
            value: 'exit',
            label: '退出',
        }
    ];

    constructor(
        private router: Router,
        private sessionService: SessionService) {
    }

    ngOnInit() {
        let userType;
        // 如果没有用户类型，说明没有登录，直接跳转登录页面
        // 暂时屏蔽权限
        // if (!this.sessionService.getItem('roles')) {
        //     this.router.navigate(['/']);
        //     return;
        // } else {
        //     this.hardImg = this.sessionService.getItem('hardImg');
        //     userType = this.sessionService.getItem('roles').split(',').map(item => {
        //         return Number(item);
        //     });
        // }
        let adminList = {};
        this.router.config.forEach(item => {
            console.log(item)
            if (item.path === 'admin') {
                adminList = item['_loadedConfig'].routes[0];
            }
        });
        adminList['children'].every(item => {
            // 屏蔽权限
            // if (item.data.roles && item.data.roles.length) {
            //     let key = false;
            //     item.data.roles.forEach(ob1 => {
            //         userType.forEach(ob2 => {
            //             if (ob1 === ob2) {
            //                 key = true;
            //             }
            //         });
            //     });
            //     if (!key) {
            //         return true;
            //     }
            // }
            if (item.data && (item.data as any).menu) {
                const itemMenu = {
                    path: item.path, name: (item.data as any).name,
                    children: [], data: item.data
                };
                this.routesMenu.forEach(subItem => {
                    if ((item.data as any).name === subItem['name']) {
                        (subItem as any).children.forEach(subSubItem => {
                            if (subSubItem.data && subSubItem.data.menu) {
                                // 屏蔽权限
                                // if (subSubItem.data.roles && subSubItem.data.roles.length) {
                                //     let key = false;
                                //     subSubItem.data.roles.forEach(ob1 => {
                                //         if (ob1 === userType) {
                                //             key = true;
                                //         }
                                //     });
                                //     if (!key) {
                                //         return;
                                //     }
                                // }
                                itemMenu.children.push({
                                    path: item.path + '/' + subSubItem.path,
                                    name: subSubItem.data.name
                                });
                            }
                        });
                    }
                });
                this.menu.push(itemMenu);
                return true;
            }
            return true;
        });
        this.setActiveMenu(this.router.url, '/admin/');
        if(this.router.url == '/admin'){

            this.router.navigate(['/admin/news']);
            this.setActiveMenu('/admin/news', '/admin/');
        }
    }
    goCollect() {
        this.menu.forEach(item => {
            item.active = false;
        });
        this.collectKey = true;
        this.router.navigate(['/admin/collect/index']);
    }

    downChange(data) {
        switch (data.value) {
            case 'my': {
                this.router.navigate(['/admin/self']);
                break;
            }
            case 'exit': {
                this.sessionService.removeItem('token');
                this.sessionService.removeItem('username');
                this.sessionService.removeItem('remember');
                this.sessionService.removeItem('password');
                this.sessionService.removeItem('id');
                this.sessionService.removeItem('roles');
                this.router.navigate(['/']);
                break;
            }
        }
    }

    // 设置菜单选中
    setActiveMenu(url, br) {
        this.menu.forEach(item => {
            item.children.forEach(subItem => {
                if (br + subItem.path === url) {
                    subItem.active = true;
                } else {
                    subItem.active = false;
                }
            });
            if (url.indexOf(item.path) !== -1) {
                item.active = true;
                if (this.menuLocation) {
                    item.show = true;
                }
            } else {
                item.active = false;
            }
        });
        if (url.indexOf('/admin/collect') !== -1) {
            this.collectKey = true;
        }
    }

    goMenu(item) {
        this.setActiveMenu(item.path, '');
        this.router.navigateByUrl('/admin/' + item.path);
    }


    bigMenu(item) {
        if (!item.children.length) {
            this.setActiveMenu(item.path, '');
            this.router.navigateByUrl('/admin/' + item.path + (item.data.hideChild ? '/index' : ''));
        }
        item.show = !item.show;
    }

    bigMenuTop(item) {
        this.collectKey = false;
        if (!item.children.length) {
            this.setActiveMenu(item.path, '');
            this.router.navigateByUrl('/admin/' + item.path + (item.data.hideChild ? '/index' : ''));
        }else{
            let t = item.open
            for(let o of this.menu){
                if(o.children.length){
                    o.open = false
                }
            }
            item.open = t?false:true;
        }
    }

    goMenuTop(item) {
        console.log(item)
        this.childrenShowKey = false;
        this.menu.forEach((item1, i) => {
            item1.show = false;
        });
        this.setActiveMenu(item.path, '');
        if (item.path.charAt(item.path.length - 1) === '/') {
            item.path = item.path.substr(0, item.path.length - 1);
        }
        this.router.navigateByUrl('/admin/' + item.path);
        setTimeout(() => {
            this.childrenShowKey = true;
        }, 100);
    }
}
