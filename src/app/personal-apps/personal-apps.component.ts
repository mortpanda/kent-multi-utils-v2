import { Component, OnInit } from '@angular/core';
import { OktaGetTokenService } from '../shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaConfigService } from "../shared/okta/okta-config.service";
import { OktaWidgetService } from '../shared/okta/okta-widget.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuListService } from '../shared/menu-list/menu-list.service';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from '../shared/api-services/api.service';
import { ProcessArrayService } from '../shared/process-array/process-array.service';

@Component({
  selector: 'app-personal-apps',
  templateUrl: './personal-apps.component.html',
  styleUrls: ['./personal-apps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalAppsComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  mainAppMenu = [];
  selectedMessage: any;
  myKey;
  myAccessToken;
  myEmail;
  myWebCache;
  dailyWebsites;
  dataLoaded: boolean;
  constructor(
    private OktaGetTokenService: OktaGetTokenService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
    private OktaWidgetService: OktaWidgetService,
    private breakpointObserver: BreakpointObserver,
    public MenuListService: MenuListService,
    private primengConfig: PrimeNGConfig,
    private ApiService: ApiService,
    private ProcessArrayService: ProcessArrayService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.mainAppMenu = this.MenuListService.mainAppMenu;
    this.dataLoaded=false;
  }

  async ngOnInit() {

    this.strUserSession = await this.authService.isAuthenticated();
    switch (this.strUserSession == true) {
      case false: {
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
        break;
      }
      case true: {
        this.strThisUser = await this.authService.token.getUserInfo()
          .then(function (user) {
            return user
          })
          .catch((err) => {
            console.log(err);
            window.location.replace(this.OktaConfigService.strPostLogoutURL);
          })
        this.strFullName = await this.strThisUser.name;
        this.myAccessToken = await this.OktaGetTokenService.GetAccessToken()
        this.myKey = await this.myAccessToken.claims.myKey;
        this.myEmail = await this.myAccessToken.claims.sub;

        this.myWebCache = await localStorage.getItem('personalApps');

        if (this.myWebCache == null) {
          console.log('Personal Apps empty');
          const colWebsites = await this.ApiService.GetMyWebsites(this.OktaConfigService.dailySitesDownloadUri, this.myKey, this.myEmail);
          const strSites = await JSON.stringify(colWebsites);
          await localStorage.setItem('personalApps', strSites)
          this.dailyWebsites = await this.ProcessArrayService.processWebSites(JSON.parse(strSites), 'My Personal Apps');
          this.dataLoaded = true;

        } else {
          const arrCachedSites = await localStorage.getItem('personalApps');
          console.log('Personal Apps from storage')
          this.dailyWebsites = await this.ProcessArrayService.processWebSites(JSON.parse(arrCachedSites), 'My Personal Apps')
          this.dataLoaded = true;
        }

        break;
      }
    }
  }
}