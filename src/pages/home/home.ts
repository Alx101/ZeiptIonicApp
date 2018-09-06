import {Component, ViewChild} from '@angular/core';
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
      icon: 'ios-camera-outline',
      id: 'camera'
    }, {
      pageName: 'ReceiptsPage',
      title: 'Receipts',
      icon: 'ios-home',
      id: 'home'
    }, {
      pageName: 'ProfilePage',
      title: 'Profile',
      icon: 'ios-contact-outline',
      id: 'contact'
    }, {
      pageName: 'SendPage',
      title: 'Share',
      icon: 'ios-send-outline',
      id: 'send'
    }
  ];

  dialogueTabs = 'events';

  searchOpen = false;
  dialogueOpen = false;
  helpDialogueOpen = false;
  openHelp = '';
  selectedTab = 1;
  structuredReceipts : any = [];

  @ViewChild(SuperTabs)superTabs : SuperTabs;
  @ViewChild(Content)content : Content;

  constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, private superTabsCtrl : SuperTabsController) {}

  ionViewDidLoad() {
    this.superTabs.config.allowElementScroll = true;
    this.dialogueTabs = 'events';
  }

  dialogueSegmentChanged(e) {
    console.log("hey");
  }

  help(service) {
    
    if (this.helpDialogueOpen) {
      document
        .getElementById(service)
        .style
        .transform = "translateY(-10px)";
      document
        .getElementById(service)
        .style
        .opacity = "0";
      document
        .getElementById("help-fade")
        .style
        .opacity = "0";
      document
        .getElementById(service)
        .style
        .pointerEvents = "none";
      document
        .getElementById("help-fade")
        .style
        .pointerEvents = "none";
      this.helpDialogueOpen = false;
    } else {
      document
        .getElementById(service)
        .style
        .transform = "translateY(0px)";
      document
        .getElementById(service)
        .style
        .opacity = "1";
      document
        .getElementById("help-fade")
        .style
        .opacity = "1";
      document
        .getElementById(service)
        .style
        .pointerEvents = "auto";
      document
        .getElementById("help-fade")
        .style
        .pointerEvents = "auto";
      this.openHelp = service;
      this.helpDialogueOpen = true;
    }
  }

  openDialogue() {
    console.log(this.dialogueOpen);
    if (this.dialogueOpen) {
      document
        .getElementById("dialogue")
        .style
        .transform = "translateY(-10px)";
      document
        .getElementById("dialogue")
        .style
        .opacity = "0";
      document
        .getElementById("home-fade")
        .style
        .opacity = "0";
      document
        .getElementById("dialogue")
        .style
        .pointerEvents = "none";
      document
        .getElementById("home-fade")
        .style
        .pointerEvents = "none";
      this.dialogueOpen = false;
    } else {
      document
        .getElementById("dialogue")
        .style
        .transform = "translateY(0px)";
      document
        .getElementById("dialogue")
        .style
        .opacity = "1";
      document
        .getElementById("home-fade")
        .style
        .opacity = "1";
      document
        .getElementById("dialogue")
        .style
        .pointerEvents = "auto";
      document
        .getElementById("home-fade")
        .style
        .pointerEvents = "auto";
      this.dialogueOpen = true;
    }
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
          page.icon = 'ios-' + ev.id;
        }
      });
  }

  toggleList() {
    if (this.searchOpen == true) {
      this.toggleSearch();
    }
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
        .getElementById("receipts-fade")
        .style
        .opacity = "1";
      document
        .getElementById("receipts-fade")
        .style
        .pointerEvents = "auto";
      document
        .getElementById("arrow")
        .style
        .transform = "scaleY(-1)";

      this.resProvider.listIsOpen = true;
    }
  }

  toggleSearch() {
    var searchbar = document.getElementById("searchbar");
    if (this.resProvider.listIsOpen == true) {
      this.toggleList();
    }
    if (this.searchOpen) {
      searchbar.getElementsByTagName("input")[0].value = "";
      this.resProvider.loadedReceipts = this.resProvider.user.receipts;
      searchbar.style.top = "-56px";
      document
        .getElementById("searchtxt")
        .textContent = "Search";
      this.searchOpen = false;
    } else {
      searchbar.style.top = "0px";
      document
        .getElementById("searchtxt")
        .textContent = "Close";
      searchbar.focus();
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