import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProductsComponent } from './components/products/products.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es'
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { InterceptorService } from './core/interceptor.service';
import { MenuFoldOutline, MenuUnfoldOutline, UserOutline,RiseOutline, ShoppingOutline, SettingOutline, DashOutline, PlusCircleOutline,
  PlusOutline
 } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UsersComponent } from './components/users/users.component';
import { ReportComponent } from './components/report/report.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

registerLocaleData(es);
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsersComponent,
    ReportComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzDividerModule,
    NzGridModule,
    NzSpaceModule,
    NzListModule,
    NzIconModule,
    NzToolTipModule,
    NzMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzTableModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: NZ_ICONS, useValue: [MenuFoldOutline,MenuUnfoldOutline, UserOutline,RiseOutline, ShoppingOutline, SettingOutline, DashOutline,
      PlusCircleOutline, PlusOutline
    ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
