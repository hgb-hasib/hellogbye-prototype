import { NgModule } from '@angular/core';
import { TripHistoryMiniComponent } from './trip-history-mini/trip-history-mini';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SkeletonLoadingPageComponent } from './skeleton-loading-page/skeleton-loading-page';
import { SkeletonStartPageComponent } from './skeleton-start-page/skeleton-start-page';
import { SkeletonItineraryPageComponent } from './skeleton-itinerary-page/skeleton-itinerary-page';
@NgModule({
	declarations: [//TripHistoryMiniComponent,
	ContentDrawerComponent,
    SkeletonLoadingPageComponent,
    SkeletonStartPageComponent,
    SkeletonItineraryPageComponent
],
	imports: [CommonModule, IonicModule],
	exports: [//TripHistoryMiniComponent,
	ContentDrawerComponent,
    SkeletonLoadingPageComponent,
    SkeletonStartPageComponent,
    SkeletonItineraryPageComponent
]
})
export class ComponentsModule {}
