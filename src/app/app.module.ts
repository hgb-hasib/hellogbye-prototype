import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { StartPage } from '../pages/start/start';
//import { StartPageModule } from '../pages/start/start.module'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebaseConfig } from '../config';
//import { TripHistoryMiniComponent } from '../components/trip-history-mini/trip-history-mini'

import { Config } from 'ionic-angular';
import { SlideUpTransition } from '../page-transitions/slide-up-transition'
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    MyApp,
    //StartPage,
    //TripHistoryMiniComponent
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
  ]
})
export class AppModule {
  //rootPage:string = "StartPage";
  constructor(public config : Config) {
    this.config.setTransition('slide-up-transition', SlideUpTransition);
  }
}
