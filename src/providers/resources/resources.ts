import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ResourcesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ResourcesProvider {

  constructor(public http: Http) {
    console.log('Hello ResourcesProvider Provider');
  }

  public loadCards() {
    return new Promise((resolve, reject) => {
        let cards = [
          {
            type:'MasterCard',
            token: '6a284f27a0e5627bd9ad746a3bf2c46f',
            last4: '1234'
          },
          {
            type:'Visa',
            token: '88d12d742f24998b3884bf775b2c7f17',
            last4: '5678'
          }
        ];

        resolve(cards);

    });
  }

  public loadReceiptParts() {
    return new Promise((resolve, reject) => {
        let receiptParts = [
          {
            year: '2017',
            months: [
              {
                month: 'June',
                weeks: [
                  {
                    nr: '28',
                    days: [
                      {
                        date:'8',
                        weekday: 'Tuesday',
                        receipts: [
                          {
                            id:'1',
                            name: 'Bohus',
                            city: 'Ås',
                            time: '14:39',
                            sum: '12 000,00',
                            currency: 'NOK'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            year: '2016',
            months: [
              {
                month: 'January',
                weeks: [
                  {
                    nr: '1',
                    days: [
                      {
                        date:'1',
                        weekday: 'Monday',
                        receipts: [
                          {
                            id:'3',
                            name: 'Starbucks',
                            city: 'Oslo',
                            time: '13:37',
                            sum: '200,00',
                            currency: 'NOK'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ];

        resolve(receiptParts);

    });
  }

}
