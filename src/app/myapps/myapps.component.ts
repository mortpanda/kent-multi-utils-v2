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
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-myapps',
  templateUrl: './myapps.component.html',
  styleUrls: ['./myapps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyappsComponent implements OnInit {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  strThisUser;
  strFullName;
  mainAppMenu = [];
  selectedMessage: any;
  myAccessToken;
  strSafeSite: SafeResourceUrl;
  strSite='https://kent-nagao-oie.oktapreview.com/app/UserHome?iframe=true&iframeControlHideAll=true&iframeControlHideSearch=true';

  constructor(
    private OktaGetTokenService: OktaGetTokenService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
    private OktaWidgetService: OktaWidgetService,
    private breakpointObserver: BreakpointObserver,
    private MenuListService: MenuListService,
    private primengConfig: PrimeNGConfig,
    private sanitizer: DomSanitizer,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.mainAppMenu=this.MenuListService.mainAppMenu;
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
          this.strSafeSite = this.sanitizer.bypassSecurityTrustResourceUrl(this.strSite);
        break;
      }
    }
  }

}
