import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {MenuListService} from '../menu-list/menu-list.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class DockComponent implements OnInit {
  toolbarItems: MenuItem[];
  smallScreen: boolean;
  constructor(
    private MenuListService:MenuListService,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.toolbarItems = this.MenuListService.dockMenu;
   }

  ngOnInit(): void {
  }

}
