import {Component, ViewChild, ViewChildren, OnChanges} from '@angular/core';
import {Content} from 'ionic-angular';
import {IonicPage, ModalController, NavController, NavParams, LoadingController} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {ReceiptDetailPage} from '../receipt-detail/receipt-detail';
import {ProfilePage} from '../profile/profile';
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

  loadedReceipts : any = [];

  constructor(public modalCtrl : ModalController, public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, private superTabsCtrl : SuperTabsController, private superTabs : SuperTabs) {

    this
      .resProvider
      .updateReceipts();

  }

  ionViewDidLoad() {
    this
      .resProvider
      .loadReceiptStorage()
    this.loadedReceipts = this.resProvider.user.receipts;
  }
  getItems(event : any) {

    if (event) {
      let value = event.target.value;
      if (value && value.trim() != '') {
        this.resProvider.user.receipts = this
          .resProvider
          .user
          .receipts
          .filter((item) => {
            return (item.year.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.month.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.day.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.datenr.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.sum.total.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.city.toLowerCase().indexOf(value.toLowerCase()) > -1);
          })
        console.log(this.resProvider.user.receipts);
      } else {
        this.resProvider.user.receipts = this.loadedReceipts;
      }
    } else {
      this.resProvider.user.receipts = this.loadedReceipts;
    }
  }

  scrollHandler(event) {
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
  search() {
    if (this.searchOpen) {
      document
        .getElementById("searchbar")
        .getElementsByTagName("input")[0]
        .value = "";
      document
        .getElementById("searchbar")
        .style
        .top = "-56px";
      document
        .getElementById("searchtxt")
        .textContent = "Search";
      this.searchOpen = false;
      this.getItems("");
    } else {
      document
        .getElementById("searchbar")
        .style
        .top = "0px";
      document
        .getElementById("searchtxt")
        .textContent = "Close";
      document
        .getElementById("searchbar")
        .focus();
      clearInterval(this.resProvider.refreshInterval);
      this.searchOpen = true;
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

  toggleList() {
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
      .getElementById("fade")
      .style
      .opacity = "0";
    document
      .getElementById("fade")
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
  /*
  goToReceipt(clickedReceipt) {
    this.resProvider.receiptView = true;
    this
      .navCtrl
      .push(ReceiptDetailPage, {receipt: clickedReceipt});
  }
*/
  goToCards() {
    this
      .superTabs
      .slideTo(2);
  }

  update(event) {
    event.complete();
    console.log("update");
  }
  goToReceipt(clickedReceipt) {
    let profileModal = this
      .modalCtrl
      .create(ReceiptDetailPage, {receipt: clickedReceipt});
    profileModal.present();
  }
}