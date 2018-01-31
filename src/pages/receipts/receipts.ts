import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {LandingPage} from '../landing/landing';
import {LoginPage} from '../login/login';
import {ReceiptDetailPage} from "../receipt-detail/receipt-detail";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the ReceiptsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({selector: 'page-receipts', templateUrl: 'receipts.html'})
export class ReceiptsPage {

    receiptParts : any = [];
    cards : any = [];
    mappedReceipts : any = [];
    loading : any;
    curDatePart : any;
    years : any = [];
    months : any = [];
    days : any = [];

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
            .loadReceiptParts()
            .then((c) => {
                var receipts = this.receiptParts;
                receipts = c;

                var dayNames = new Array(),
                    monthNames = new Array();

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

                var mappedReceipts = receipts.map((receipt) => {
                    var dateString = receipt.receipt.date,
                        timeString = receipt.receipt.time,
                        y = parseInt(dateString.substr(0, 4)),
                        m = (parseInt(dateString.substr(5, 2)) - 1),
                        d = parseInt(dateString.substr(8, 2)),
                        hour = parseInt(timeString.substr(0, 2)),
                        minute = parseInt(timeString.substr(3, 2)),
                        second = parseInt(timeString.substr(6, 2)),
                        date = new Date(y, m, d, hour, minute, second),
                        mName = monthNames[date.getMonth()],
                        dName = d + ", " + dayNames[date.getDay()];
                    return [
                        y,
                        mName,
                        dName,
                        receipt, {
                            "date": date
                        }
                    ];
                }).reduce((accumulator, [year, month, day, receipt]) => {

                    let current = accumulator[year] = accumulator[year] || {};
                    current = current[month] = current[month] || {};
                    current = current[day] = current[day] || [];
                    current.push(receipt);
                    return accumulator;
                }, {})

                function wrapInArrays(data) {
                    return Array.isArray(data)
                        ? data
                        : Object
                            .entries(data)
                            .map(([key, value]) => {
                                return {[key]: wrapInArrays(value)};
                            });
                }

                this.years = Object.keys(mappedReceipts);

                //TODO: SORT BETTER
                this
                    .years
                    .sort()
                    .reverse()
                    .forEach(year => {
                        Object
                            .keys(mappedReceipts[year])
                            .sort((a, b) => {
                                return monthNames.indexOf(a) - monthNames.indexOf(b);
                            })
                            .forEach(month => {
                                this
                                    .months
                                    .push(month);
                                mappedReceipts[year][month];
                                Object
                                    .keys(mappedReceipts[year][month])
                                    .forEach(day => {
                                        this
                                            .days
                                            .push(day);
                                    })
                            });
                    });

                const wrapped = wrapInArrays(mappedReceipts);
                this.mappedReceipts = wrapped;

                this
                    .loading
                    .dismiss();
            })
            .catch(() => {
                this
                    .loading
                    .dismiss();
                this.receiptParts = [];
            });
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
            .setRoot(LandingPage, {}, {
                animate: true,
                direction: 'forward'
            });
    }

    goToReceipt(clickedReceipt) {
        this
            .navCtrl
            .push(ReceiptDetailPage, {receipt: clickedReceipt});
    }
    closeYear(yearToClose) {
        var yearContainer = document.getElementById(yearToClose);

        if (yearContainer.style.height == "41px") {
            yearContainer.style.height = "auto";
        } else {
            yearContainer.style.height = "41px";
        }
    }
    logout() {
        this
            .resProvider
            .clearStorage();
        this
            .navCtrl
            .setRoot(LoginPage, {}, {
                animate: true,
                direction: 'forward'
            });
    }
}