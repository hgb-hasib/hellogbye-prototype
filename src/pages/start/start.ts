import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  // example of adding a transition when a page/modal closes
  // ionViewWillLeave() {

  //   let options: NativeTransitionOptions = {
  //     direction: 'up',
  //     duration: 500,
  //     slowdownfactor: 3,
  //     slidePixels: 20,
  //     iosdelay: 100,
  //     androiddelay: 150,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 60
  //   };

  //   this.nativePageTransitions.slide(options);

  // }

  startRequest() {
    // let options: NativeTransitionOptions = {
    //   direction: "up",
    //   duration: 500,
    //   slowdownfactor: -1,
    //   fixedPixelsTop: 60,
    //   fixedPixelsBottom: 44
    // };
    // this.nativePageTransitions.slide(options);
    // this.navCtrl.push('ChatPage');
    //this.navCtrl.push('ChatPage');
    
    this.navCtrl.push('ChatPage', null, { animation: 'slide-up-transition', direction: 'forward', duration: 1000 });
  }

}
