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
      tooltipOptions: {
        tooltipLabel: "Daily Apps",
        tooltipPosition: "top",
      },
      icon: "pi pi-box",
      // style: 'font-size: 2rem;',
      routerLink: '/websites'
    },
    {
      tooltipOptions: {
        tooltipLabel: "Admin Dashboard",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "User Dashboard",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "Okta Sites",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "K-Lab Sites",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "Dev Info",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "OIE Prjects",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "Personal Prjects",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "Bookmarks",
        tooltipPosition: "top",
      },
      icon: "pi pi-bookmark-fill",
      // style: 'font-size: 2rem;',
      routerLink: '/bookmarks'
    },
    {
      tooltipOptions: {
        tooltipLabel: "World Clock",
        tooltipPosition: "top",
      },
      icon: "pi pi-clock",
      // style: 'font-size: 2rem;',
      routerLink: '/worldtime'
    },


  ]



  dockMenu = [
    {
      tooltipOptions: {
        tooltipLabel: "Main Menu",
        tooltipPosition: "top",
      },
      icon: "pi pi-bars",
      routerLink: '/start',
    },

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

  async Logout() {
    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  }

  async GoHome() {
    window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }

}
