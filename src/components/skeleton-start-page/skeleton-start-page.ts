import { Component } from '@angular/core';

/**
 * Generated class for the SkeletonStartPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'skeleton-start-page',
  templateUrl: 'skeleton-start-page.html'
})
export class SkeletonStartPageComponent {

  text: string;

  constructor() {
    console.log('Hello SkeletonStartPageComponent Component');
    this.text = 'Hello World';
  }

}
