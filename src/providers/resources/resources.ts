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
          type: 'MasterCard',
          token: '6a284f27a0e5627bd9ad746a3bf2c46f',
          last4: '1234'
        },
        {
          type: 'Visa',
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
          year: '2016',
          months: [
            {
              month: 'January',
              receipts: [
                {
                  header: {
                    org_nr: '830',
                    adress: 'Bauhausgatan 3, Västerås 72468',
                    name: 'Bauhaus',
                    employee: 'Lena Törnqvist',
                    time: '01:39',
                    sum_without_vat: '10.00',
                    sum_with_vat: '12.00',
                    date: '2016-01-01'
                  },
                  body: {
                    '23': {
                      art_name: 'Flaska',
                      art_quantity: '1',
                      art_sum: '12.00',
                      art_vat: '2.00',
                      art_price: '12.00'
                    }
                  },
                  footer: {
                    payment_id: '1',
                    currency: 'SEK',
                    payment_nr: '2', //(National referens number)
                    bax_number: '1', //(Terminal nr)
                    national_merchant_nr: '8' //(Vi får dessa av terminalen)
                  }
                }
              ]
            }
          ]
        },
        {
          year: '2015',
          months: [
            {
              month: 'June',
              receipts: [
                {
                  header: {
                    org_nr: '830',
                    adress: 'Bauhausgatan 3, Västerås 72468',
                    name: 'Bauhaus',
                    employee: 'Lena Törnqvist',
                    time: '01:39',
                    sum_without_vat: '10.00',
                    sum_with_vat: '12.00',
                    date: '2016-07-01'
                  },
                  body: {
                    '23': {
                      art_name: 'Flaska',
                      art_quantity: '1',
                      art_sum: '12.00',
                      art_vat: '2.00',
                      art_price: '12.00'
                    }
                  },
                  footer: {
                    payment_id: '1',
                    currency: 'SEK',
                    payment_nr: '2', //(National referens number)
                    bax_number: '1', //(Terminal nr)
                    national_merchant_nr: '8' //(Vi får dessa av terminalen)
                  }
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
