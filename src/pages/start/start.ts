import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage({
  name: 'StartPage'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  panOptions: any;
  pageCount: number;
  activePage: number;
  main_content_top_margin: number;
  content_transition: string;

  constructor(public navCtrl: NavController, public element: ElementRef, public renderer: Renderer2, public platform: Platform) {
    this.pageCount = 2;
    this.activePage = 0;
    this.main_content_top_margin = -this.activePage * this.platform.height();
    this.content_transition = 'none';
    this.panOptions = {
      handleHeight: 20,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  ionViewDidLoad() {
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
    hammer.on('panend', (ev) => {
      this.handlePanEnd(ev);
    })
  }

  transitionToPage() {
    // this.navCtrl.pop({ animate: false }).then(() => {
    //   this.navCtrl.push('ChatPage', {}, { animate: false });
    // });
    this.activePage = 1;
    this.content_transition = 'margin-top 0.5s';
    this.main_content_top_margin = -this.activePage * this.platform.height();
    setTimeout(() => {
      this.startRequest();
    }, 500);
  }

  startRequest() {
    this.navCtrl.push('ChatPage', {}, { animate: false });
  }


  handlePan(ev) {
    let newTop = ev.center.y;
    this.content_transition = 'none'
    if (newTop > 0 && newTop < (this.platform.height() - this.panOptions.handleHeight)) {
      this.main_content_top_margin = -this.activePage * this.platform.height() + ev.deltaY;
    }
  }

  handlePanEnd(ev) {
    let newTop = ev.center.y;
    let bounceToBottom = false;
    let bounceToTop = false;
    if (this.panOptions.bounceBack && ev.isFinal) {
      let topDiff = newTop - this.panOptions.thresholdFromTop;
      let bottomDiff = (this.platform.height() - this.panOptions.thresholdFromBottom) - newTop;
      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
    }

    if ((newTop < this.panOptions.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
      if (this.activePage !== this.pageCount - 1) {
        this.activePage = this.activePage + 1;
        this.content_transition = 'margin-top 0.5s';
        this.main_content_top_margin = -this.activePage * this.platform.height();
      }
      setTimeout(() => {
        this.startRequest();
      }, 500);
    } else if (((this.platform.height() - newTop) < this.panOptions.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
      if (this.activePage != 0) {
        this.activePage = this.activePage - 1;
        this.content_transition = 'margin-top 0.5s';
        this.main_content_top_margin = -this.activePage * this.platform.height();
      }
    }
  }
}
