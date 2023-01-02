import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { OktaSDKAuthService } from '../okta/okta-auth.service';
import { OktaConfigService } from '../okta/okta-config.service';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor(
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaConfigService: OktaConfigService,
  ) { }

  mainAppMenu = [
    {
      label: "Daily Apps",
      strUri: '/dailysites',
    },
    {
      label: "Admin Dashboard",
      strUri: '/admin'
    },
    {
      label: "User Dashboard",
      strUri: '/user'
    },
    {
      label: "Okta Sites",
      strUri: '/bookmarks'
    },
    {
      label: "K-Lab Sites",
      strUri: '/bookmarks'
    },
    {
      label: "Dev Info",
      strUri: '/bookmarks'
    },
    {
      label: "OIE Projects",
      strUri: '/bookmarks'
    },
    {
      label: "Personal Projects",
      tooltipPosition: "top",
      strUri: '/bookmarks'
    },
    {
      label: "Bookmarks",
      strUri: '/bookmarks'
    },
    {
      label: "World Clock",
      strUri: '/worldtime'
    },


  ]



  dockMenu = [
    {
      tooltipOptions: {
        tooltipLabel: "Home",
        tooltipPosition: "top",
      },
      icon: "pi pi-home",
      command: () => {
        this.GoHome();
      }
    },
    {
      tooltipOptions: {
        tooltipLabel: "Main Menu",
        tooltipPosition: "top",
      },
      icon: "pi pi-bars",
      routerLink: '/menu',
    },
    {
      tooltipOptions: {
        tooltipLabel: "Logout",
        tooltipPosition: "top",
      },
      icon: "pi pi-power-off",
      command: () => {
        this.Logout();
      }
    },
  ]

  mainDockItems = [
    {
      tooltipOptions: {
        tooltipLabel: "Main Menu",
        tooltipPosition: "right",
      },
      icon: "pi pi-bars",
      style: 'font-size: 2rem;',
      routerLink: '/start',
    },

    {
      tooltipOptions: {
        tooltipLabel: "Home",
        tooltipPosition: "right",
      },
      icon: "pi pi-home",
      style: 'font-size: 2rem;',
      command: () => {
        this.GoHome();
      }
    },

    {
      tooltipOptions: {
        tooltipLabel: "Logout",
        tooltipPosition: "right",
      },
      icon: "pi pi-power-off",
      style: 'font-size: 2rem;',
      command: () => {
        this.Logout();
      }
    },
  ]

  async Goto(url){
    await window.open(url, '_blank');
  } 

  async Logout() {
    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }

}
