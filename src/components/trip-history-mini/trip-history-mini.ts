import { Component, OnInit } from '@angular/core';
import { PaginatedDataProvider } from '../../providers/paginated-data/paginated-data'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'trip-history-mini',
  templateUrl: 'trip-history-mini.html',
  providers: [PaginatedDataProvider]
})
export class TripHistoryMiniComponent implements OnInit {
  fakeTrips: Array<any> = new Array(5);

  constructor(private page : PaginatedDataProvider, private toastCtrl : ToastController) {
  }

  ngOnInit() {
    // Simulating network latency with a timeout
    setTimeout(() => {
      this.page.init('trips', 'date', { limit: 10, reverse: false, prepend: false })
    }, 500);
  }

  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.page.more();
      infiniteScroll.complete();
    }, 500);
    this.page.done.subscribe((response) => {
      if (response) {
        this.presentToast("No further trips.");
      }
    });
  }

  presentToast(toastMsg) {
    let toast = this.toastCtrl.create({
        message: toastMsg,
        duration: 1000,
        position: 'bottom',
        dismissOnPageChange: true
    });
    toast.present();
  }
}
