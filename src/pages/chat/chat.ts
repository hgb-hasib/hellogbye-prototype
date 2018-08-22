import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
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
  panOptions: any;
  pageCount: number;
  activePage: number;
  main_content_top_margin: number;
  content_transition: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private modal: ModalController, public element: ElementRef, public renderer: Renderer2, public platform: Platform) {
    this.pageCount = 3;
    this.activePage = 1;
    this.main_content_top_margin = -this.activePage * this.platform.height();
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

  openHelpModal() {

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
          this.loadResults();
        }, 2000);
      } else if (this.message.toUpperCase() === 'i am flying from toronto'.toUpperCase()) {
        this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Okay, let me find some options!', timeStamp: new Date() });
        setTimeout(() => {
          this.loadResults();
        }, 2000);
      }
      this.message = '';
    }
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  loadResults() {
    this.navCtrl.push('LoadingItineraryPage', null, { animation: 'slide-up-transition', direction: 'forward', duration: 1000 });
  }

  ngOnInit() {
    this.messages = this.messages.concat({ type: 'incoming', id: '1', text: 'Hi, tell me where you would like to travel to.', timeStamp: new Date() });
  }

  back() {
    this.navCtrl.push('StartPage', null, { animation: 'slide-up-transition', direction: 'back', duration: 1000 });
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
    hammer.on('panend', (ev) => {
      this.handlePanEnd(ev);
    })
  }

  loadItinerary() {
    this.navCtrl.push('LoadingItineraryPage', {}, { animate: false });
  }

  backToWelcome() {
    this.navCtrl.push('StartPage', {}, { animate: false });
  }

  handlePan(ev) {
    let newTop = ev.center.y;
    this.content_transition = 'none'
    if (newTop > 0 && newTop < (this.platform.height() - this.panOptions.handleHeight)) {
      this.main_content_top_margin = -this.activePage * this.platform.height() + ev.deltaY;
    }
  }

  handlePanEnd(ev) {
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
        setTimeout(() => {
          this.loadItinerary();
        }, 500);
      }
    } else if (((this.platform.height() - newTop) < this.panOptions.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
      if (this.activePage != 0) {
        this.activePage = this.activePage - 1;
        this.content_transition = 'margin-top 0.5s';
        this.main_content_top_margin = -this.activePage * this.platform.height();
        setTimeout(() => {
          this.backToWelcome();
        }, 500);
      }
    }
  }

}
