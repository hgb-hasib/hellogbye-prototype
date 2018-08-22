import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPage } from './start';
import { TripHistoryMiniComponent } from '../../components/trip-history-mini/trip-history-mini';
import { SkeletonSharedComponentsModule } from '../../components/_shared-skeletons/shared-skeleton-components.module';
//import { SkeletonChatPageComponent } from '../../components/skeleton-chat-page/skeleton-chat-page'


@NgModule({
  declarations: [
    StartPage,
    TripHistoryMiniComponent//,
    //SkeletonChatPageComponent
  ],
  imports: [
    IonicPageModule.forChild(StartPage),
    SkeletonSharedComponentsModule
  ],
  exports: [
    StartPage
  ]
})
export class StartPageModule {}
