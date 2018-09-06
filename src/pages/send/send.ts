import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SendModalPage} from '../send-modal/send-modal';

@IonicPage()
@Component({selector: 'page-send', templateUrl: 'send.html'})
export class SendPage {

  constructor(public modal : ModalController, public homepage : HomePage) {}

  ionViewDidLoad() {}

  openService(service) {
    const sendModal = this
      .modal
      .create(SendModalPage, {data: service})
    sendModal.present();
  }
  help(service) {
    this.homepage.help(service)
  }
}
