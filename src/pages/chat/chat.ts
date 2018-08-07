import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient, private modal : ModalController) {}

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

      this.messages = this.messages.concat({type: 'outgoing', id: '1', text: this.message, timeStamp: new Date()});

      if (this.message.toUpperCase() === 'fly me to nyc'.toUpperCase()) {
        this.messages = this.messages.concat({type: 'incoming', id: '1', text: 'Sure! Where will you be flying from?', timeStamp: new Date()});
      } else if (this.message.toUpperCase() === 'stay in a hotel for 3 nights in nyc'.toUpperCase()) {
        this.messages = this.messages.concat({type: 'incoming', id: '1', text: 'Okay, let me find some options!', timeStamp: new Date()});
      } else if (this.message.toUpperCase() === 'i am flying from toronto'.toUpperCase()) {
        this.messages = this.messages.concat({type: 'incoming', id: '1', text: 'Okay, let me find some options!', timeStamp: new Date()});
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

  ngOnInit() {
    this.messages = this.messages.concat({type: 'incoming', id: '1', text: 'Hi, tell me where you would like to travel to.', timeStamp: new Date()});
  }

  back() {
    this.navCtrl.push('StartPage', null, { animation: 'slide-up-transition', direction: 'back', duration: 1000 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
