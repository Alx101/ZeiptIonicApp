import {Component, ViewChild, ViewChildren} from '@angular/core';
import {Content} from 'ionic-angular';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {ReceiptDetailPage} from '../receipt-detail/receipt-detail';
import {SuperTabs, SuperTabsController} from "ionic2-super-tabs";

@IonicPage()
@Component({selector: 'page-receipts', templateUrl: 'receipts.html'})
export class ReceiptsPage {

  @ViewChild(Content)content : Content;
  @ViewChildren('accordion')accordion;

  loading : any;

  dateString : any;
  timeString : any;

  monthBreaks = document.getElementsByClassName("month");
  yearBreaks = document.getElementsByClassName("year");

  searchOpen = false;

  receipttabs = 'receipts';

  constructor(public modalCtrl : ModalController, public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, private superTabsCtrl : SuperTabsController, private superTabs : SuperTabs) {
    this.resProvider.loadedReceipts = resProvider.user.receipts;
  }

  ionViewDidLoad() {
    this.receipttabs = 'receipts';
  }

  segmentChanged(yea) {
    console.log(yea);
  }
  getItems(event : any) {
    if (event) {
      let value = event.target.value;
      if (value && value.trim() != '') {
        this.resProvider.loadedReceipts = this
          .resProvider
          .user
          .receipts
          .filter((item) => {
            return (item.year.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.month.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.day.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.datenr.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.sum.total.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.city.toLowerCase().indexOf(value.toLowerCase()) > -1);
          })
      } else {
        this.resProvider.loadedReceipts = this.resProvider.user.receipts;
      }
    } else {
      this.resProvider.loadedReceipts = this.resProvider.user.receipts;
    }
  }
  scrollHandler() {
    var passedMonthElements = [];
    var passedYearElements = [];
    for (var i = 0; i < this.monthBreaks.length; i++) {
      if ((this.monthBreaks[i].getBoundingClientRect().top < 95)) {
        passedMonthElements.push(this.monthBreaks[i].getBoundingClientRect().top)
      }
    }
    for (var j = 0; j < this.monthBreaks.length; j++) {
      if ((this.monthBreaks[j].getBoundingClientRect().top == Math.max(...passedMonthElements))) {
        document
          .getElementById("fixedbtnmonth")
          .innerHTML = this.monthBreaks[j].textContent;
      }
    }
    for (var k = 0; k < this.yearBreaks.length; k++) {
      if ((this.yearBreaks[k].getBoundingClientRect().top < 65)) {
        passedYearElements.push(this.yearBreaks[k].getBoundingClientRect().top)
      }
    }
    for (var l = 0; l < this.yearBreaks.length; l++) {
      if ((this.yearBreaks[l].getBoundingClientRect().top == Math.max(...passedYearElements))) {
        document
          .getElementById("fixedbtnyear")
          .innerHTML = this.yearBreaks[l].id;
      }
    }
  }

  scrollToMonth(scrollToMonth) {
    let yOffset = document
      .getElementById(scrollToMonth)
      .offsetTop;
    this
      .content
      .scrollTo(0, yOffset - 78, 1000)
  }

  closeList() {
    this
      .superTabsCtrl
      .enableTabsSwipe(true);
    document
      .getElementById("monthList")
      .style
      .top = "calc(-66px)";
    document
      .getElementById("monthList")
      .style
      .opacity = "0";
    document
      .getElementById("receipts-fade")
      .style
      .opacity = "0";
    document
      .getElementById("receipts-fade")
      .style
      .pointerEvents = "none";
    document
      .getElementById("arrow")
      .style
      .transform = "scaleY(1)";
    document
      .getElementById("fixedbtn")
      .style
      .backgroundColor = ("#0f2841");
    this.resProvider.listIsOpen = false;
  }

  goToCards() {
    this
      .superTabs
      .slideTo(2);
  }

  update(event) {
    event.complete();
  }

  goToReceipt(clickedReceipt, i) {
    let profileModal = this
      .modalCtrl
      .create(ReceiptDetailPage, {receipt: clickedReceipt, index: i});
    profileModal.present();
  }
}