import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacesAutocompleteComponent, PlaceSearchResult } from './components/places-autocomplete/places-autocomplete.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, PlacesAutocompleteComponent, MatToolbarModule, PlaceDetailsComponent, MapDisplayComponent],
  template: `
  <mat-toolbar> 
    Google maps API
  </mat-toolbar>
  <div class="container">

    <div class="input-area">
      <h2>I want to go from</h2>
      <app-places-autocomplete
      (placeChanged)="fromValue = $event"
      ></app-places-autocomplete>
      <h2>To</h2>
      <app-places-autocomplete
      (placeChanged)="toValue = $event"
      ></app-places-autocomplete>
    </div>
    <div class="display-area" [hidden]="!fromValue?.address && !toValue">
      <div>
        <app-place-details [data]="fromValue" > </app-place-details>
        <app-place-details [data]="toValue" > </app-place-details>
      </div>
      <app-map-display [from]="fromValue" [to]="toValue"> </app-map-display>
    </div>
  </div>

  `,
  styles: [`
   .container {
        padding: 24px;
      }
    
      .input-area {
        display: flex;
        gap: 16px;
        align-items: center;

      }

      .display-area{
        display: flex;
        height: calc(100vh - 180px);

        > div {
          width: 30%;
          padding: 8px;
          height: inherit;
          overflow: auto;

          > * {
            margin-bottom: 16px;
          }
        }

        > app-map-display {
          width: 70%;
          height: inherit;
        }
      }
      .display-area[hidden] {
        display: none;
      }
    
    `
  ]
})
export class AppComponent {

  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
}