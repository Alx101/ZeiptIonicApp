import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {LandingPage} from '../landing/landing';
import {ReceiptDetailPage} from "../receipt-detail/receipt-detail";

/**
 * Generated class for the ReceiptsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-receipts', templateUrl: 'receipts.html'})
export class ReceiptsPage {

    receiptParts : any = [];
    mappedReceipts : any = [];
    loading : any;
    curDatePart : any;
    years : any = [];
    months : any = [];
    days : any = [];

    constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public loadCtrl : LoadingController) {
        this.loading = loadCtrl.create({content: 'Please wait, loading...'});
        this
            .loading
            .present();

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
                    "Desember"
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
                        //console.log([y, mName, dName, receipt, {"date": date}]);
                    return [y, mName, dName, receipt, {"date": date}];
                }).reduce((accumulator, [year, month, day, receipt]) => {

                    let current = accumulator[year] = accumulator[year] || {};
                    current = current[month] = current[month] || {};
                    current = current[day] = current[day] || [];
                    current.push(receipt);
                    return accumulator;
                }, {})

                //console.log(mappedReceipts);
                //this.mappedReceipts = mappedReceipts;

                /*
                "years":[{ 
                    "year": "2016",
                    "months": [{
                        "month": "october",
                        "days": [{
                            "day": "monday",
                            "receipts": [{receipt}]
                        }]

                    }]
                }, {
                    "year": "2017",
                    "months": [{
                        "month": "january",
                        "days": [{
                            "day": "friday",
                            "receipts": [{receipt}]
                        }, {
                            "day": "wednesday",
                            "receipts": [{receipt}]
                        }]
                    }, {
                        "month": "september",
                        "days": [{
                            "day": "saturday",
                            "receipts": [{receipt}, {receipt}]
                        }]
                    }]
                }]
                
                */
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
                this.years.sort().reverse().forEach(year => {
                    Object.keys(mappedReceipts[year]).sort((a,b)=>{
                        return monthNames.indexOf(a)
                        - monthNames.indexOf(b);
                    }).forEach(month => {
                        this.months.push(month);
                        mappedReceipts[year][month];
                        Object.keys(mappedReceipts[year][month]).forEach(day => {
                            this.days.push(day);
                        })
                    });
                });

                const wrapped = wrapInArrays(mappedReceipts);
                this.mappedReceipts = wrapped;

                console.log(this.mappedReceipts);
                console.log(this.years)
                console.log(this.months)
                /*console.log(this.days)
                */

                
                this
                    .loading
                    .dismiss();
            });
    }

    ionViewDidLoad() {
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
}