import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  clearCache(){
    localStorage.removeItem('adminSites');
    localStorage.removeItem('colBookmarks');
    localStorage.removeItem('oktaSites');
    localStorage.removeItem('oieApps');
    localStorage.removeItem('userSites');
    localStorage.removeItem('personalApps');
    localStorage.removeItem('dailySites');
  }
}
