import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(  ) { }

  async OktaGet(url, token) {
    const thisFetch = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }


  async InvokeFlow(url, content) {
    const thisFetch = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

  async processApiResponse(arrRes) {
    var ResStatus;
    switch (arrRes.length > 0) {
      case true: {
        ResStatus = "SUCCESS"
        break;
      }

      case false: {
        ResStatus = "FAILURE"
        break;
      }

    }
    return ResStatus;
  }

  async GetMyWebsites(url, mykey, email) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    var strWebsites;
    strWebsites = await this.InvokeFlow(requestURI, requestBody);
    return strWebsites;
  }

  
  async uploadWebApp(url, mykey, email, appName, appCategory, appUri) {
    let requestURI;
    requestURI = url;

    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
      category: appCategory,
      appname: appName,
      appUri: appUri,

    }

    let newWebApp;
    newWebApp = await this.InvokeFlow(requestURI, requestBody);
    // console.log(newWebApp.status);
    return newWebApp;
  }


}

