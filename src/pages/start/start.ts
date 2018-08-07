import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  startRequest() {
    this.navCtrl.push('ChatPage', null, { animation: 'slide-up-transition', direction: 'forward', duration: 1000 });
  }

}
