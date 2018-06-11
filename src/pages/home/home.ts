import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Content} from 'ionic-angular';

import {SuperTabs, SuperTabsController} from "ionic2-super-tabs";

import {ResourcesProvider} from '../../providers/resources/resources';
import {LoginPage} from '../login/login';

@IonicPage()
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {

  pages = [
    {
      pageName: 'ScanPage',
      title: 'Scan',
      icon: 'camera-outline',
      id: 'camera'
    }, {
      pageName: 'ReceiptsPage',
      title: 'Receipts',
      icon: 'home',
      id: 'home'
    }, {
      pageName: 'ProfilePage',
      title: 'Profile',
      icon: 'contact-outline',
      id: 'contact'
    }, {
      pageName: 'SendPage',
      title: 'Send',
      icon: 'send-outline',
      id: 'send'
    }
  ];
  searchOpen = false;

  selectedTab = 1;
  structuredReceipts : any = [];


  @ViewChild(SuperTabs)superTabs : SuperTabs;
  @ViewChild(Content)content : Content;

  monthBreaks = document.getElementsByClassName("month");
  yearBreaks = document.getElementsByClassName("year");

  loadedReceipts : any = [];

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, private superTabsCtrl : SuperTabsController) {}

  ionViewDidLoad() {
    this
      .resProvider
      .loadReceiptStorage();
    this.loadedReceipts = this.resProvider.user.receipts;
    this.superTabs.config.allowElementScroll = true;
  }

  onTabSelect(ev : any) {
    this.selectedTab = ev.index;
    this
      .pages
      .forEach(page => {
        if (page.icon.indexOf('-outline') == -1) {
          page.icon += '-outline';
        }
        if (page.id == ev.id) {
          page.icon = ev.id;
        }
      });
  }

  toggleList() {
    if (this.resProvider.listIsOpen) {
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
      
    } else {
      this
        .superTabsCtrl
        .enableTabsSwipe(false);
      document
        .getElementById("monthList")
        .style
        .top = "0px";
      document
        .getElementById("monthList")
        .style
        .opacity = "1";
      document
        .getElementById("fade")
        .style
        .opacity = "1";
      document
        .getElementById("fade")
        .style
        .pointerEvents = "auto";
      document
        .getElementById("arrow")
        .style
        .transform = "scaleY(-1)";

      this.resProvider.listIsOpen = true;
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
      this.resProvider.user.receipts = this.loadedReceipts;
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

  logout() {
    this
      .resProvider
      .clearUser();
    this
      .navCtrl
      .setRoot(LoginPage, {}, {
        animate: true,
        direction: 'forward'
      });
  }
}
