import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N, zh_CN, NgZorroAntdModule } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';

registerLocaleData(zh);


@NgModule({
    declarations: [LoginComponent,AppComponent],
    imports: [
        NoopAnimationsModule,
        BrowserAnimationsModule,
        HttpModule,
        ShareModule,
        RouterModule.forRoot([
            {
                path: '',
                component: LoginComponent,
                data: {
                    name: '用户登录'
                }
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule',
                data: {
                    name: 'admin',
                    // type: [1, 2],
                    hideChild: true,
                    menu: true
                }
            }
        ], { useHash: true }),
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN }
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
}
