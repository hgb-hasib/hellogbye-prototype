import { Component } from '@angular/core';

/**
 * Generated class for the SkeletonLoadingPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'skeleton-loading-page',
  templateUrl: 'skeleton-loading-page.html'
})
export class SkeletonLoadingPageComponent {

  text: string;

  constructor() {
    console.log('Hello SkeletonLoadingPageComponent Component');
    this.text = 'Hello World';
  }

}
