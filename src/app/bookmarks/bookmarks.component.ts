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
import { Table } from 'primeng/table';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BookmarksComponent implements OnInit {
  
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
  siteLoaded: boolean;
  myBookmarks;
  searchText;
  dataLoaded: boolean;

  tableColumns = [
    { field: 'description', header: 'Description' },
    { field: 'category', header: 'Category' },
    { field: 'siteURL', header: 'URL' },
  ];

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

        this.myWebCache = await localStorage.getItem('colBookmarks');
        let colWebsites
        if (this.myWebCache == null) {
          console.log('Bookmarks empty');
          colWebsites = await this.ApiService.GetMyWebsites(this.OktaConfigService.strMyBookmarkDownload, this.myKey, this.myEmail);
          const strSites = await JSON.stringify(colWebsites);
          await localStorage.setItem('colBookmarks', strSites)

          this.myBookmarks = await colWebsites.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          this.dataLoaded = true;

        } else {
          let arrCachedSites = await localStorage.getItem('colBookmarks');
          console.log('Bookmarks from storage');
          colWebsites = await JSON.parse(arrCachedSites);

          this.myBookmarks = await colWebsites.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

          this.dataLoaded = true;
        }
        break;
      }
    }
    console.log(this.strThisUser)
    console.log(this.myKey)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myBookmarks.filter(s => s.includes(filterValue));
  }

  openWebsite(event) {
    window.open(event.data.siteURL, '_blank');
  }

  clear(table: Table) {
    table.clear();
  }
}
