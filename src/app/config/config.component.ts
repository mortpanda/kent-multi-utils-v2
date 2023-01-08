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
import { MessageService } from 'primeng/api';
import { GeneralService } from '../shared/general/general.service';
import { ApiService } from '../shared/api-services/api.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  mainAppMenu = [];
  selectedMessage: any;
  myAccessToken;
  configMenu;
  addWebsite;
  clearCache;
  arrAppCat = [];
  selectedCat;
  toastMsg;

  siteName;
  webURI;

  myKey;
  myEmail;
  uploadURL;

  constructor(
    private OktaGetTokenService: OktaGetTokenService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
    private OktaWidgetService: OktaWidgetService,
    private breakpointObserver: BreakpointObserver,
    private MenuListService: MenuListService,
    private primengConfig: PrimeNGConfig,
    private MessageService: MessageService,
    private GeneralService: GeneralService,
    private ApiService: ApiService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.mainAppMenu = this.MenuListService.mainAppMenu;
    this.configMenu = this.MenuListService.configMenu;
    this.addWebsite = false;
    this.clearCache = false;
    this.arrAppCat = this.MenuListService.addWebsiteMenu;

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
        break;
      }
    }
  }


  showModalDialog(config) {
    console.log(config)
    switch (config) {
      case 'addWebsite': {
        this.addWebsite = true;
        break;
      }
      case 'clearCache': {
        this.GeneralService.clearCache()
        this.toastMsg = "Cache deleted";
        this.showSuccess();
        break;
      }
    }

  }

  uploadRes;
  async saveWebsite(modalBol) {
    this.addWebsite = modalBol;
    this.myAccessToken = await this.OktaGetTokenService.GetAccessToken();
    this.myKey = await this.myAccessToken.claims.myKey;
    this.myEmail = await this.myAccessToken.claims.sub;

    console.log(this.selectedCat.name);
    console.log(this.siteName);
    console.log(this.webURI);

    switch (this.selectedCat.name) {
      case "Wiki": {
        this.uploadURL = await this.OktaConfigService.strAddBookmarkURL
        break;
      }
      case "Dev": {
        this.uploadURL = await this.OktaConfigService.strAddBookmarkURL
        break;
      }
      case "Work_others": {
        this.uploadURL = await this.OktaConfigService.strAddBookmarkURL
        break;
      }
      case "Others": {
        this.uploadURL = await this.OktaConfigService.strAddBookmarkURL
        break;
      }
      default: {
        this.uploadURL = await this.OktaConfigService.strNewWebAppURL
        break;
      }
    }

    await console.log(this.uploadURL)
    this.uploadRes = await this.ApiService.uploadWebApp(this.uploadURL, this.myKey, this.myEmail, this.siteName, this.selectedCat.name, this.webURI)

    if (this.uploadRes.status == "Upload Successful") {
      this.toastMsg = await "Upload Successful";
      await this.showSuccess();
    } else {
      this.toastMsg = await "Error!";
      this.showError()
    }
    this.uploadURL = await "";
    this.siteName = await "";
    this.webURI = "";
  }

  showSuccess() {
    this.MessageService.add({ severity: 'success', summary: 'Success', detail: this.toastMsg });
  }

  showError() {
    this.MessageService.add({ severity: 'error', summary: 'Error', detail: this.toastMsg });
  }
  onReject() {
    this.MessageService.clear('c');
  }
}
