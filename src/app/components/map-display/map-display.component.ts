import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../places-autocomplete/places-autocomplete.component';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template:`
  <google-map #map [zoom]="zoom" width="100%">
  <map-directions-renderer
  *ngIf="directionsResult" 
  [directions]="directionsResult">
    
  </map-directions-renderer>

  <map-marker *ngIf="markerPosition" [position]="markerPosition"> </map-marker>

  </google-map>
 
  `,
  styles: `
  `
})
export class MapDisplayComponent {

  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input() from: PlaceSearchResult | undefined
  @Input() to: PlaceSearchResult | undefined

  zoom = 5;

  directionsResult: google.maps.DirectionsResult | undefined;

  markerPosition: google.maps.LatLng | undefined;

  constructor(private directionsService: MapDirectionsService) {

  }

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if(fromLocation && toLocation){
      this.getDirections(fromLocation, toLocation);
    }else if (fromLocation){
      this.gotoLocation(fromLocation);
    }else if (toLocation){
      this.gotoLocation(toLocation);
    }
  }

  gotoLocation(location: google.maps.LatLng){
    this.markerPosition = location;
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult = undefined;
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng){

    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request).pipe(
      map(res => res.result)
    ).subscribe((result) => {
      this.directionsResult = result;
      this.markerPosition = undefined;
    })

  }

}
