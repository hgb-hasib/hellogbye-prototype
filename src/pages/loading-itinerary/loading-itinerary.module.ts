import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingItineraryPage } from './loading-itinerary';
import { SkeletonSharedComponentsModule } from '../../components/_shared-skeletons/shared-skeleton-components.module'

@NgModule({
  declarations: [
    LoadingItineraryPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingItineraryPage),
    SkeletonSharedComponentsModule
  ],
})
export class LoadingItineraryPageModule {}
