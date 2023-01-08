import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { DockComponent } from './shared/dock/dock.component';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { DailysitesComponent } from './dailysites/dailysites.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { OktaSitesComponent } from './okta-sites/okta-sites.component';
import { MyOieAppsComponent } from './my-oie-apps/my-oie-apps.component';
import { PersonalAppsComponent } from './personal-apps/personal-apps.component';
import { WorldtimeComponent } from './worldtime/worldtime.component';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfigComponent } from './config/config.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MenuComponent,
    DockComponent,
    DailysitesComponent,
    AdminComponent,
    UserComponent,
    OktaSitesComponent,
    MyOieAppsComponent,
    PersonalAppsComponent,
    WorldtimeComponent,
    BookmarksComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DockModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    TableModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ProgressSpinnerModule,
  ],
  providers: [DatePipe, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
