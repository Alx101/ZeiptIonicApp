import {Component, ViewChild, ViewChildren} from '@angular/core';
import {Content} from 'ionic-angular';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {CardsPage} from '../cards/cards';
import {LoginPage} from '../login/login';
import {ReceiptDetailPage} from "../receipt-detail/receipt-detail";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {request} from 'node-fetch';
/**
 * Generated class for the ReceiptsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({selector: 'page-receipts', templateUrl: 'receipts.html'})
export class ReceiptsPage {
    headers = {
        'Accept': 'application/json'
    };

    @ViewChild(Content)content : Content;
    @ViewChildren('accordion')accordion;

    searchQuery : string = '';

    receiptJson : any = [];
    structuredReceipts : any = [];
    cards : any = [];
    loading : any;

    dateString : any;
    timeString : any;

    dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    monthBreaks = document.getElementsByClassName("month");
    yearBreaks = document.getElementsByClassName("year");

    listOpen = false;
    searchOpen = false;

    checkTime(i) {
        return (i < 10)
            ? "0" + i
            : i;
    }

    constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public loadCtrl : LoadingController, public iab : InAppBrowser) {
        this.loading = loadCtrl.create({content: 'Please wait, loading...'});
        this
            .loading
            .present();

        resProvider
            .loadCards()
            .then((c) => {
                this.cards = c;
            });

        resProvider
            .loadReceiptJson()
            .then((receipts) => {
                this.structure(receipts);

                this
                    .loading
                    .dismiss();
            })
            .catch(() => {
                this
                    .loading
                    .dismiss();
                this.receiptJson = [];
            });
    }
    structure(receipts) {
        this.receiptJson = receipts;

        const structuredReceipts = this
            .receiptJson
            .map(receipt => {
                const date = receipt.receipt.date,
                    time = receipt.receipt.time,
                    Y = parseInt(date.substr(0, 4)),
                    M = (parseInt(date.substr(5, 2)) - 1),
                    D = parseInt(date.substr(8, 2)),
                    h = parseInt(time.substr(0, 2)),
                    m = parseInt(time.substr(3, 2)),
                    s = parseInt(time.substr(6, 2)),
                    datetime = new Date(Y, M, D, h, m, s)
                return {receiptDate: datetime, receiptObj: receipt}
            })
            .sort((a, b) => (a.receiptDate > b.receiptDate
                ? -1
                : 1))
            .reduce((accumulator, obj) => {
                let current = {
                    "year": obj
                        .receiptDate
                        .getFullYear(),
                    "month": this.monthNames[
                        obj
                            .receiptDate
                            .getMonth()
                    ],
                    "datenr": obj
                        .receiptDate
                        .getDate(),
                    "day": this.dayNames[
                        obj
                            .receiptDate
                            .getDay()
                    ],
                    "time": this.checkTime(obj.receiptDate.getHours()) + ":" + this.checkTime(obj.receiptDate.getMinutes()),
                    "receipt": obj.receiptObj,
                    "date": obj.receiptDate
                }
                accumulator.push(current) || {};
                return accumulator;
            }, []);

        this.structuredReceipts = structuredReceipts;
        console.log(structuredReceipts)
    }

    getItems(event : any) {
        this.structure(this.receiptJson);
        let value = event.target.value;
        if (value && value.trim() != '') {

            this.structuredReceipts = this
                .structuredReceipts
                .filter((item) => {
                    return (item.year.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.month.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.day.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.datenr.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.sum.total.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.receipt.merchant.city.toLowerCase().indexOf(value.toLowerCase()) > -1);
                })
        }
    }

    scrollHandler(event) {
        var passedMonthElements = [];
        var passedYearElements = [];
        for (var i = 0; i < this.monthBreaks.length; i++) {
            if ((this.monthBreaks[i].getBoundingClientRect().top < 100)) {
                passedMonthElements.push(this.monthBreaks[i].getBoundingClientRect().top)
            }
        }
        for (var i = 0; i < this.monthBreaks.length; i++) {
            if ((this.monthBreaks[i].getBoundingClientRect().top == Math.max(...passedMonthElements))) {
                document
                    .getElementById("fixedbtnmonth")
                    .innerHTML = this.monthBreaks[i].textContent;
            }
        }
        for (var i = 0; i < this.yearBreaks.length; i++) {
            if ((this.yearBreaks[i].getBoundingClientRect().top < 70)) {
                passedYearElements.push(this.yearBreaks[i].getBoundingClientRect().top)
            }
        }
        for (var i = 0; i < this.yearBreaks.length; i++) {
            if ((this.yearBreaks[i].getBoundingClientRect().top == Math.max(...passedYearElements))) {
                document
                    .getElementById("fixedbtnyear")
                    .innerHTML = this.yearBreaks[i].id;
            }
        }
    }
    search() {
        if (this.searchOpen) {
            document
                .getElementById("searchbar")
                .style
                .top = "-46px";
            document
                .getElementById("searchtxt")
                .textContent = "Search";
            this.searchOpen = false;
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
            this.searchOpen = true;
        }
    }
    toggleList() {
        if (this.listOpen) {
            document
                .getElementById("monthList")
                .style
                .top = "calc(-100vh + 58px)";
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
                .backgroundColor = ("#f1f5fa");
            this.listOpen = false;
        } else {
            document
                .getElementById("monthList")
                .style
                .top = "15px";
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
            document
                .getElementById("fixedbtn")
                .style
                .backgroundColor = ("#ffffff");
            this.listOpen = true;
        }
    }
    scrollToMonth(scrollToMonth) {
        let yOffset = document
            .getElementById(scrollToMonth)
            .offsetTop;
        this
            .content
            .scrollTo(0, yOffset - 40, 1000)
    }

    ionViewDidLoad() {}
    newCard()
    {
        const browser = this
            .iab
            .create('http://localhost:8000/registercard/1234');
    }

    goToCards()
    {
        this
            .navCtrl
            .setRoot(CardsPage, {}, {
                animate: true,
                direction: 'forward'
            });
    }

    goToReceipt(clickedReceipt) {
        this
            .navCtrl
            .push(ReceiptDetailPage, {receipt: clickedReceipt});
    }
}