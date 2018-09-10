import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SkeletonChatPageComponent } from '../skeleton-chat-page/skeleton-chat-page';
import { SkeletonItineraryPageComponent} from '../skeleton-itinerary-page/skeleton-itinerary-page';
@NgModule({
	declarations: [
	SkeletonChatPageComponent,
	SkeletonItineraryPageComponent
],
	imports: [CommonModule, IonicModule],
	exports: [
	SkeletonChatPageComponent,
	SkeletonItineraryPageComponent
]
})
export class SkeletonSharedComponentsModule {}
