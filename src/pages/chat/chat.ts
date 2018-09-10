import { Component, ViewChild, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, Content, List, NavController, NavParams, ModalController, Platform, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';

/*
  Chat page created using tutorial:
  https://pusher.com/tutorials/chat-app-ionic-sentiment
 */

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('pagesContainer') private pagesContainer: ElementRef;
  @ViewChild('messageArea') private messageArea: ElementRef;
  @ViewChild('bottomOfChat') private bottomOfChat: ElementRef;
  topPosition: number;
  topThresholdPercentage: number;
  bottomThresholdPercentage: number;
  panOptions: any;
  pageCount: number;
  activePage: number;
  main_content_top_margin: number;
  content_transition: string;
  isScrolling = false;
  resultIsReady = false;
  private mutationObserver: MutationObserver;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private modal: ModalController, public element: ElementRef, public renderer: Renderer2, public platform: Platform, private toastCtrl: ToastController) {
    this.topThresholdPercentage = 0.7;
    this.bottomThresholdPercentage = 0.3;
    this.topPosition = 0;
    this.pageCount = 4;
    this.activePage = 1;
    //this.main_content_top_margin = this.activePage * this.platform.height();
    this.content_transition = 'none';
    this.panOptions = {
      handleHeight: 20,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;

  openSettingsModal() {
    const settingsModal = this.modal.create('TripRequestSettingsPage');
    settingsModal.present();
  }

  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };

      // this.http
      //   .post(`http://localhost:4000/messages`, data)
      //   .subscribe((res: Message) => {
      //     const message = {
      //       ...res,
      //       // The message type is added to distinguish between incoming and outgoing messages. It also aids with styling of each message type
      //       type: 'outgoing',
      //     };
      //     this.messages = this.messages.concat(message);
      //     this.message = '';
      //   });

      this.messages = this.messages.concat({ type: 'outgoing', id: '1', text: this.message, timeStamp: new Date() });

      if (this.message.toUpperCase() === 'fly me to istanbul'.toUpperCase()) {
        this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Sure! Where will you be flying from?', timeStamp: new Date() });
      } else if (this.message.toUpperCase() === 'stay in a hotel for 9 nights in istanbul'.toUpperCase()) {
        this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Okay, let me find some options!', timeStamp: new Date() });
        setTimeout(() => {
          this.resultIsReady = true;
        }, 2000);
      } else if (this.message.toUpperCase() === 'i am flying from toronto'.toUpperCase()) {
        this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Okay, let me find some options!', timeStamp: new Date() });
        setTimeout(() => {
          this.resultIsReady = true;
        }, 2000);
      }
      this.message = '';
      this.scrollToBottom();
    }
  }
  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ionViewDidLoad() {
    //this.scrollToBottom();
  }

  loadResults() {
    this.navCtrl.push('LoadingItineraryPage', null, { animation: 'slide-up-transition', direction: 'forward', duration: 1000 });
  }

  transitionToPage() {
    this.activePage = 2;
    this.content_transition = 'margin-top 0.5s';
    this.main_content_top_margin = -this.activePage * this.platform.height();
    setTimeout(() => {
      this.loadingItinerary();
    }, 200);
  }

  ngOnInit() {
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Hi, tell me where you would like to travel to.', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'This is just', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'extra fluff', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'to take up more', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'screen real estate', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'so we might be able', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'to', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 's', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'c', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'rr', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'ooooooo', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'llllll', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'running out of things to say', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: '.......', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'blah blah', timeStamp: new Date() });
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Hi, tell me where you would like to travel to.', timeStamp: new Date() });
  }

  ngAfterViewInit() {
    // let hammer = new window['Hammer'](this.element.nativeElement);
    // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

    // hammer.on('pan', (ev) => {
    //   this.handlePan(ev);
    // });
    // hammer.on('panend', (ev) => {
    //   this.handlePanEnd(ev);
    // })
    this.messageArea.nativeElement.scrollTop = 1;
    this.pagesContainer.nativeElement.scrollTop = this.activePage * this.platform.height();
  }

  back() {
    this.activePage = 0;
    this.content_transition = 'margin-top 0.5s';
    this.main_content_top_margin = -this.activePage * this.platform.height();
    setTimeout(() => {
      this.backToWelcome();
    }, 200);
  }

  loadingItinerary() {
    this.navCtrl.push('LoadingItineraryPage', {}, { animate: false });
  }

  viewItinerary() {
    this.navCtrl.push('ItineraryPage', {}, { animate: false });
  }

  backToWelcome() {
    this.navCtrl.push('StartPage', {}, { animate: false });
  }

  handlePan(ev) {
    if (this.isScrolling) {
      return;
    }
    //if (this.messageArea.nativeElement.scrollTop === 0 || this.messageArea.nativeElement.scrollTop === this.messageArea.nativeElement.scrollHeight) {
    let newTop = ev.center.y;
    let bounceToBottom = false;
    let bounceToTop = false;
    if (this.panOptions.bounceBack && ev.isFinal) {
      let topDiff = newTop - this.panOptions.thresholdFromTop;
      let bottomDiff = (this.platform.height() - this.panOptions.thresholdFromBottom) - newTop;
      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
    }

    if ((newTop < this.panOptions.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
      if (this.activePage !== this.pageCount - 1) {
        this.activePage = this.activePage + 1;
        this.content_transition = 'margin-top 0.5s';
        this.main_content_top_margin = -this.activePage * this.platform.height();
      }
      setTimeout(() => {
        this.viewItinerary();
      }, 200);
    } else if (((this.platform.height() - newTop) < this.panOptions.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
      if (this.activePage != 0) {
        this.activePage = this.activePage - 1;
        this.content_transition = 'margin-top 0.5s';
        this.main_content_top_margin = -this.activePage * this.platform.height();
        setTimeout(() => {
          this.backToWelcome();
        }, 200);
      }
    } else {
      this.content_transition = 'none'
      if (newTop > 0 && newTop < (this.platform.height() - this.panOptions.handleHeight)) {
        this.main_content_top_margin = -this.activePage * this.platform.height() + ev.deltaY;
      }
    }
    //}
    //this.presentToast('panning page now');

  }

  handlePanEnd(ev) {
    this.isScrolling = false;
    // let newTop = ev.center.y;
    // let bounceToBottom = false;
    // let bounceToTop = false;
    // if (this.panOptions.bounceBack && ev.isFinal) {
    //   let topDiff = newTop - this.panOptions.thresholdFromTop;
    //   let bottomDiff = (this.platform.height() - this.panOptions.thresholdFromBottom) - newTop;
    //   topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
    // }

    // if ((newTop < this.panOptions.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
    //   if (this.activePage !== this.pageCount - 1) {
    //     this.activePage = this.activePage + 1;
    //     this.content_transition = 'margin-top 0.5s';
    //     this.main_content_top_margin = -this.activePage * this.platform.height();
    //     setTimeout(() => {
    //       this.loadItinerary();
    //     }, 500);
    //   }
    // } else if (((this.platform.height() - newTop) < this.panOptions.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
    //   if (this.activePage != 0) {
    //     this.activePage = this.activePage - 1;
    //     this.content_transition = 'margin-top 0.5s';
    //     this.main_content_top_margin = -this.activePage * this.platform.height();
    //     setTimeout(() => {
    //       this.backToWelcome();
    //     }, 500);
    //   }
    // }
  }

  presentToast(toastMsg) {
    let toast = this.toastCtrl.create({
      message: toastMsg,
      duration: 1000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

  panStartScrollArea(ev) {
    //this.presentToast('starting pan scroll area');
    //if (this.messageArea.nativeElement.scrollTop > 0 && this.messageArea.nativeElement.scrollTop < this.messageArea.nativeElement.scrollHeight) {
    if (this.isElementInViewPort(this.bottomOfChat, this.platform.height())) {
      this.isScrolling = true;
    } else {
      this.isScrolling = false;
    }
  }

  panEndScrollArea(ev) {
    if (this.isElementInViewPort(this.bottomOfChat, this.platform.height())) {
      this.isScrolling = true;
    } else {
      this.isScrolling = false;
    }
  }

  onScroll(ev) {
    this.topPosition = this.pagesContainer.nativeElement.scrollTop;
    let topOfCurrentPage = this.activePage * this.platform.height();
    let bottomOfCurrentPage = (this.activePage + 1) * this.platform.height();

    // if scrolling up
    if (this.topPosition < topOfCurrentPage) {
      console.log('scrolling up');
      // check against threshold
      if (this.topPosition <= ((this.topThresholdPercentage) * (this.activePage * this.platform.height()))) {
        console.log('scrolled up past threshold');
        // go to previous page
        this.activePage = this.activePage - 1;
        this.content_transition = 'margin-top 0.5s';
        //this.main_content_top_margin = this.activePage * this.platform.height();
        this.pagesContainer.nativeElement.scrollTop = this.activePage * this.platform.height();
      } else {
        // bounce back
        // this.content_transition = 'margin-top 0.5s';
        // this.main_content_top_margin = this.activePage * this.platform.height();
      }
    } else if (this.topPosition > bottomOfCurrentPage) {
      console.log('scrolling down');
      // check against threshold
      if (this.topPosition >= ((this.bottomThresholdPercentage) * ((this.activePage + 1) * this.platform.height()))) {
        console.log('scrolled down past threshold');
        // go to next page
        this.activePage = this.activePage + 1;
        this.content_transition = 'margin-top 0.5s';
        //this.main_content_top_margin = this.activePage * this.platform.height();
        this.pagesContainer.nativeElement.scrollTop = this.activePage * this.platform.height();
      } else {
        // bounce back
        // this.content_transition = 'margin-top 0.5s';
        // this.main_content_top_margin = this.activePage * this.platform.height();
      }
    }
    // this.presentToast('scrolling');
    // if (this.messageArea.nativeElement.scrollTop === 0 || this.messageArea.nativeElement.scrollTop === this.messageArea.nativeElement.scrollHeight) {
    //   this.isScrolling = false;
    // } else {
    //   this.isScrolling = true;
    // }
  }

  onScrollEnd(ev) {
    this.isScrolling = false;
  }

  scrollToBottom() {
    this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
  }

  //This function just check if element is fully in vertical viewport or not
  isElementInViewPort(element: ElementRef, viewPortHeight: number) {
    let rect = element.nativeElement.getBoundingClientRect();
    this.presentToast(rect.top + "bottom: " + rect.bottom);
    return rect.top >= 0 && (rect.bottom <= viewPortHeight);
  }
}
