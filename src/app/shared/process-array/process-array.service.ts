import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessArrayService {

  constructor() { }


  processWebSites(colArray, strFilter) {
    var intCount = 0;
    const arrSites = [];
    for (var i = 0; i < colArray.length; i++) {

      switch (colArray[i].websiteCategory) {
        case strFilter: {
          arrSites[intCount] = ({
            name: colArray[i].websiteName,
            strUri: colArray[i].websiteURL,
            strCat: colArray[i].websiteCategory,
          })
          intCount++
          break;
        }
      }
    }
    
    return arrSites
  }

}
