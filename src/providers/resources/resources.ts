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

}
