import { Component, ViewChild, Input, ElementRef, Renderer2  } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Keyboard } from '@ionic-native/keyboard';
import { StartPage } from '../pages/start/start';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild('myNav') navCtrl: NavController
  rootPage = 'StartPage';
  //rootPage:any = StartPage;
  // drawerOptions: any;
  // skeleton_top = 0;
  // skeleton_transition = 'none';
  // drawnUp = false;

  // pages: any[] = [
  //   { page: 'StartPage', skeletonPage: 'SkeletonStartPage' },
  //   { page: 'ChatPage', skeletonPage: 'SkeletonChatPage' },
  //   { page: 'LoadingItineraryPage', skeletonPage: 'SkeletonLoadingPage' },
  //   { page: 'ItineraryPage', skeletonPage: 'SkeletonItineraryPage' }
  // ];

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public element: ElementRef, public renderer: Renderer2) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // this.skeleton_top = 0;
    // this.drawerOptions = {
    //   handleHeight: 20,
    //   thresholdFromBottom: 100,
    //   thresholdFromTop: 100,
    //   bounceBack: true
    // };
  }

  // ngAfterViewInit() {
  //   let hammer = new window['Hammer'](this.element.nativeElement);
  //   hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

  //   hammer.on('pan', (ev) => {
  //     this.handlePan(ev);
  //   });
  // }

  // handlePan(ev) {
  //   let newTop = ev.center.y;
  //   let bounceToBottom = false;
  //   let bounceToTop = false;

  //   if (this.drawerOptions.bounceBack && ev.isFinal) {
  //     let topDiff = newTop - this.drawerOptions.thresholdFromTop;
  //     let bottomDiff = (this.platform.height() - this.drawerOptions.thresholdFromBottom) - newTop;
  //     topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
  //   }

  //   if ((newTop < this.drawerOptions.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
  //     this.skeleton_transition = 'margin-top 0.5s';
  //     this.skeleton_top = -this.platform.height();
  //     this.drawnUp = true;
  //     // setTimeout(() => {
  //     //   this.startRequest();
  //     // }, 1000);
  //   } else if (((this.platform.height() - newTop) < this.drawerOptions.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
  //     this.skeleton_transition = 'margin-top 0.5s';
  //     this.skeleton_top = 0;
  //     this.drawnUp = false;
  //   } else {
  //     this.skeleton_transition = 'none'
  //     if (newTop > 0 && newTop < (this.platform.height() - this.drawerOptions.handleHeight)) {

  //       if (ev.additionalEvent === "panup" || ev.additionalEvent === "pandown") {
  //         if (!this.drawnUp) {
  //           this.skeleton_top = 0 + ev.deltaY;
  //         } else {
  //           this.skeleton_top = -this.platform.height() + ev.deltaY;
  //         }

  //       }
  //     }
  //   }
  // }

}

