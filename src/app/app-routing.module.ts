import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { DailysitesComponent } from './dailysites/dailysites.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { OktaSitesComponent } from './okta-sites/okta-sites.component';
import { MyOieAppsComponent } from './my-oie-apps/my-oie-apps.component';
import { PersonalAppsComponent } from './personal-apps/personal-apps.component';
import { WorldtimeComponent } from './worldtime/worldtime.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ConfigComponent } from './config/config.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'dailysites', component: DailysitesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'oktasites', component: OktaSitesComponent },
  { path: 'myoieapps', component: MyOieAppsComponent },
  { path: 'personalapps', component: PersonalAppsComponent },
  { path: 'worldtime', component: WorldtimeComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'config', component: ConfigComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
