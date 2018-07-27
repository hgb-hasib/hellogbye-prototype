import { NgModule } from '@angular/core';
import { TripHistoryMiniComponent } from './trip-history-mini/trip-history-mini';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { IonicModule } from 'ionic-angular/umd';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [//TripHistoryMiniComponent,
    ContentDrawerComponent],
	imports: [CommonModule, IonicModule],
	exports: [//TripHistoryMiniComponent,
    ContentDrawerComponent]
})
export class ComponentsModule {}
