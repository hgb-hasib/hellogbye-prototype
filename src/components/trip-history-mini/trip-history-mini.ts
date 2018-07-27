import { Component, OnInit } from '@angular/core';
//import { Trip } from '../../models/trip'
//import { TripHistoryProvider } from '../../providers/trip-history/trip-history';
import { PaginatedDataProvider } from '../../providers/paginated-data/paginated-data'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'trip-history-mini',
  templateUrl: 'trip-history-mini.html',
  //providers: [TripHistoryProvider]
  providers: [PaginatedDataProvider]
})
export class TripHistoryMiniComponent implements OnInit {

  constructor(private page : PaginatedDataProvider, private toastCtrl : ToastController) {
    //private tripHistoryProvider: TripHistoryProvider) {
    // this.tripHistoryProvider.getTripHistory()
    //   .subscribe(result => {
    //     this.tripHistory = result['trips'];
    //   }
    //   );
  }

  ngOnInit() {
    this.page.init('trips', 'date', { limit: 10, reverse: false, prepend: false })
  }

  loadMore(infiniteScroll) {
    // if (this.page.done) {
    //   this.presentToast("No more trips.");
    // }
    setTimeout(() => {
      this.page.more();
      infiniteScroll.complete();
    }, 1000);
  }

  presentToast(toastMsg) {
    let toast = this.toastCtrl.create({
        message: toastMsg,
        duration: 1500,
        position: 'bottom',
        dismissOnPageChange: true
    });
    toast.present();
  }
}
