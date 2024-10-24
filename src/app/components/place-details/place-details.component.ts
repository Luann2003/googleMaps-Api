import { Component, Input, OnInit } from '@angular/core';
import { PlaceSearchResult } from '../places-autocomplete/places-autocomplete.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-place-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
  <mat-card *ngIf="data?.address"> 
      <img class="place-image" [src]="data?.imageUrl" mat-card-image />
      <mat-card-header> 
        <img mat-card-avatar [src]="data?.iconUrl"/>
        <mat-card-title> {{ data?.name }} </mat-card-title>
      </mat-card-header>

  </mat-card>
  `,
  styles: [`

    :host{
      display: block;
    }

  .place-image{
    height: 200px;
    object-fit: cover;
    object-position: center;

  }
    `]
})
export class PlaceDetailsComponent implements OnInit {

  @Input() data: PlaceSearchResult | undefined;


  ngOnInit(): void {
    
  }
}
