import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItineraryPage } from './itinerary';
import { SkeletonSharedComponentsModule } from '../../components/_shared-skeletons/shared-skeleton-components.module';
//import { SkeletonChatPageComponent } from '../../components/skeleton-chat-page/skeleton-chat-page';

@NgModule({
  declarations: [
    ItineraryPage//,
    //SkeletonChatPageComponent
  ],
  imports: [
    IonicPageModule.forChild(ItineraryPage),
    SkeletonSharedComponentsModule
  ],
})
export class ItineraryPageModule {}
