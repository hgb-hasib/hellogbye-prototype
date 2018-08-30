import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import 'hammerjs'

import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebaseConfig } from '../config';
import { Config } from 'ionic-angular';
import { SlideUpTransition } from '../page-transitions/slide-up-transition'
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SkeletonComponentProvider } from '../providers/skeleton-component/skeleton-component';
//import { SkeletonChatPageComponent } from '../components/skeleton-chat-page/skeleton-chat-page'
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser'
export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    MyApp
    //SkeletonChatPageComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //StartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
    SkeletonComponentProvider
  ]
})
export class AppModule {
  //rootPage:string = "StartPage";
  constructor(public config : Config) {
    this.config.setTransition('slide-up-transition', SlideUpTransition);
  }
}

