import { Component } from '@angular/core';

/**
 * Generated class for the SkeletonItineraryPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'skeleton-itinerary-page',
  templateUrl: 'skeleton-itinerary-page.html'
})
export class SkeletonItineraryPageComponent {

  text: string;

  constructor() {
    console.log('Hello SkeletonItineraryPageComponent Component');
    this.text = 'Hello World';
  }

}
