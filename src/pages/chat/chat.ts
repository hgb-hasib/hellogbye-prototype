import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(private http : HttpClient) {}

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;

  sendMessage() {
    console.log("send clicked");
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };

      this.http
        .post(`http://localhost:4000/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing messages. It also aids with styling of each message type
            type: 'outgoing',
          };
          this.messages = this.messages.concat(message);
          this.message = '';
        });

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
