import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldtimeService {
  TimeZoneSydney = 'Australia/Sydney';
  TimeZoneSingapore = 'Asia/Singapore';
  TimeZoneTokyo = 'Asia/Tokyo';
  TimeZoneSanFran = 'America/Los_Angeles';
  TimeZoneNY = 'America/New_York';
  TimeZoneLondon = 'Europe/London';
  TimeZoneUTC = 'Etc/UTC';

  strSydneyDate;
  strSydneyTime;
  strSingaporeDate;
  strSingaporeTime;
  strNYDate;
  strNYTime;
  strUTCDate;
  strUTCTime;
  strTokyoDate;
  strTokyoTime;
  strSanFranDate;
  strSanFranTime;
  strLondonDate;
  strLondonTime;
  arrTimeData;
  public strApiURL = 'https://worldtimeapi.org/api/timezone/';

  constructor(
    public datePipe: DatePipe,
  ) { }

  async GetTime(strTimeZone) {

    const FetchTime = fetch(this.strApiURL + strTimeZone, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));
    this.arrTimeData = await FetchTime;
    console.log(this.arrTimeData);

    switch (strTimeZone) {
      case 'Asia/Tokyo': {
        this.strTokyoDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strTokyoTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'America/Los_Angeles': {
        this.strSanFranDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSanFranTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Europe/London': {
        this.strLondonDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strLondonTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Australia/Sydney': {
        this.strSydneyDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSydneyTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Asia/Singapore': {
        this.strSingaporeDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSingaporeTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'America/New_York': {
        this.strNYDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strNYTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Etc/UTC': {
        this.strUTCDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strUTCTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
    }

  }


arrWorldTime=[];
  async GetWorldTime() {
    this.GetTime(this.TimeZoneTokyo);
      this.GetTime(this.TimeZoneSanFran);
      this.GetTime(this.TimeZoneLondon);
      this.GetTime(this.TimeZoneSingapore);
      this.GetTime(this.TimeZoneSydney);
      this.GetTime(this.TimeZoneNY);
      this.GetTime(this.TimeZoneUTC);
      
    interval(1000 * 10).subscribe(x => {
      this.GetTime(this.TimeZoneTokyo);
      this.GetTime(this.TimeZoneSanFran);
      this.GetTime(this.TimeZoneLondon);
      this.GetTime(this.TimeZoneSingapore);
      this.GetTime(this.TimeZoneSydney);
      this.GetTime(this.TimeZoneNY);
      this.GetTime(this.TimeZoneUTC);
    })
    
  }



}
