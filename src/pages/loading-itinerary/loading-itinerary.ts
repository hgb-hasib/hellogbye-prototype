import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-loading-itinerary',
  templateUrl: 'loading-itinerary.html',
})
export class LoadingItineraryPage {
  pageCount: number;
  activePage: number;
  main_content_top_margin: number;
  content_transition: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.pageCount = 2;
    this.activePage = 0;
    this.main_content_top_margin = -this.activePage * this.platform.height();
    this.content_transition = 'none';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingItineraryPage');

    setTimeout(() => {
      this.transitionToPage();
    }, 2000);
  }

  transitionToPage() {
    this.activePage = 1;
    this.content_transition = 'margin-top 0.5s';
    this.main_content_top_margin = -this.activePage * this.platform.height();
    setTimeout(() => {
      this.finishedLoading();
    }, 200);
  }

  finishedLoading() {
    this.navCtrl.push('ItineraryPage', {}, { animate: false });
  }

}
