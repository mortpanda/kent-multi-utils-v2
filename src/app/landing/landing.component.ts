import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {OktaWidgetService} from '../shared/okta/okta-widget.service';
import {OktaConfigService} from '../shared/okta/okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  smallScreen: boolean;
  constructor(
    private OktaConfigService:OktaConfigService,
    private OktaWidgetService:OktaWidgetService,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
   }

   async ngOnInit() {
    
    await this.OktaWidgetService.login(this.OktaConfigService.strRedirectURL)
  }


}
