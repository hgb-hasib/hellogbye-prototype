import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';

import { SkeletonStartPageComponent } from '../../components/skeleton-start-page/skeleton-start-page'
import { SkeletonChatPageComponent } from '../../components/skeleton-chat-page/skeleton-chat-page'
import { SkeletonLoadingPageComponent } from '../../components/skeleton-loading-page/skeleton-loading-page'
import { SkeletonItineraryPageComponent } from '../../components/skeleton-itinerary-page/skeleton-itinerary-page'

@Injectable()
export class SkeletonComponentProvider {
  componentMap = { 
    'SkeletonStartPage': SkeletonStartPageComponent,
    'SkeletonChatPage': SkeletonChatPageComponent,
    'SkeletonLoadingPage': SkeletonLoadingPageComponent,
    'SkeletonItineraryPage': SkeletonItineraryPageComponent
  };

  constructor(private factoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.viewContainerRef = viewContainerRef
  }

  addDynamicComponent(skeletonComponentName: string) {
    const factory = this.factoryResolver
      .resolveComponentFactory(this.componentMap[skeletonComponentName])
    const component = factory
      .create(this.viewContainerRef.parentInjector)
    this.viewContainerRef.insert(component.hostView)
  }

}
