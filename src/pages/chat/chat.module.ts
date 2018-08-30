import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { SkeletonLoadingPageComponent } from '../../components/skeleton-loading-page/skeleton-loading-page'
import { SkeletonStartPageComponent } from '../../components/skeleton-start-page/skeleton-start-page'
import { SkeletonSharedComponentsModule } from '../../components/_shared-skeletons/shared-skeleton-components.module';

@NgModule({
  declarations: [
    ChatPage,
    SkeletonStartPageComponent,
    SkeletonLoadingPageComponent
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    SkeletonSharedComponentsModule
  ],
})
export class ChatPageModule {}
