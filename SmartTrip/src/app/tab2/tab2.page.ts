import {Component, ElementRef, ViewChild} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('map')  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: 39.0876459,
    lng: 35.1777724,
  }

  constructor() {}

  ngAfterViewInit(){
    this.createMap();
  }
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 13,
      },
    });
    }
}
