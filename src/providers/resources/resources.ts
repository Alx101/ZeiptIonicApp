import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ResourcesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ResourcesProvider {
  cards : any;
  backendURL : string;
  workoffline : boolean = true;

  constructor(public http : Http, private storage : Storage) {
    this.backendURL = "http://demo.zeipt.se/public";
  }

  public loadCards() {
    return new Promise((resolve, reject) => {
      if (this.workoffline) {

        let cards = [
          
          {
            'lastfour': '1111',
            'type': 'Visa'
          }
        ];
        resolve(cards);

      } else {
        this
          .http
          .get(this.backendURL + "/cards/1234")
          .map(res => res.json())
          .subscribe(data => {
            if(data.success == 0) {
              this.storage.get('cards').then((cards) => {
                resolve(cards);
              }).catch(() => {
                reject();
              });
            } else {
              this.storage.set('cards', data.cards).then((val) => {
                console.log("Stored cards for offline use");
              });
              resolve(data.cards);
            }
          }, err => {
            //TODO: Fetch from cache
            this.storage.get('cards').then((cards) => {
              resolve(cards);
            }).catch(() => {
              reject();
            });
          });
      }
      console.log("getting cards...");

    });
  }

  // Fetch receipts. Should be fetched from backend though, so this is temporary.
  // Todo: connect to backend
  public loadReceiptParts() {
    let receiptParts = [
      
      //30 sept 2017 14:20 NoeAnnet Bergen 199.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Gullfunn", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com", // The website address that the operating merchant wants to display on the receipt.
          "logo": "",
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-09-30", //Date set by the POS for the transaction.
          "time": "14:20:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 14000.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //30 sept 2017 14:10 Hvafornoe Bergen 198.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Narvesen", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-09-30", //Date set by the POS for the transaction.
          "time": "14:10:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 29.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //29 sept 2017 14:10 Hvafornoe Bergen 198.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Vinmonopolet", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-09-29", //Date set by the POS for the transaction.
          "time": "14:10:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 198.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //28 sept 2017 14:10 Hvafornoe Bergen 198.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Apoteket", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-09-28", //Date set by the POS for the transaction.
          "time": "14:10:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 198.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //28 aug 2017 14:10 Hvafornoe Bergen 198.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "NoeAnnet", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-08-28", //Date set by the POS for the transaction.
          "time": "14:10:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 198.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //28 july 2017 14:10 Hvafornoe Bergen 198.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "NoeAnnet", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Bergen", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-07-28", //Date set by the POS for the transaction.
          "time": "14:10:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 198.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //4 feb 2017 14:20 Vinmonopolet Oslo 1299.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Vinmonopolet", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Oslo", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-02-04", //Date set by the POS for the transaction.
          "time": "14:20:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 289.50, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //6 jan 2017 14:45 Bohus Oslo 100499.50,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Bohus", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Oslo", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-01-06", //Date set by the POS for the transaction.
          "time": "14:45:07", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 100499.50, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //4 jan 2017 14:20 Vinmonopolet Oslo 1299.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Vinmonopolet", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Oslo", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2017-01-04", //Date set by the POS for the transaction.
          "time": "14:20:11", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 289.50, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //24 des 2016 12:12 Juleverksted Skomakergata 2400.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Juleverksted", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Skomakergata", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2016-12-24", //Date set by the POS for the transaction.
          "time": "12:12:24", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 2400.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      },
      //24 okt 2016 12:12 Juleverksted Skomakergata 2400.00,-
      {

        "reference": {
          // These lines can be flexible and might include a range of objects. Despite
          // this we see just some of them to be mandatory for the UI. Some examples could
          // be the following:
          "zeipt_receipt_v": "0.86.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old": "", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_nr": "", // The org number given to the POS provider producing this receipt.
          "pos_vat_nr": "", // The vat number given to the POS provider producing this receipt.
          "pos_name": "", // The name of the POS provider (POS system) producing this receipt.
          "pos_v": "" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant": {
          "name": "Juleverksted", // Name of the merchant
          "org_nr": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "vat_nr": "MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "city": "Skomakergata", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt": {
          "receipt_nr": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by its POS.
          "date": "2016-10-24", //Date set by the POS for the transaction.
          "time": "12:12:24", // The time set by the POS for the transaction in HH:MM:SS.
        },
        "sum": {
          "total": 2400.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "currency": "NOK",
          "vat_codes": "1", // Summary of what codes has been used for the VAT.
          "vat": 0.00, // The total sum of the VAT.
          "without_vat_discount": 0.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "after_return_without_vat_discount": 0.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "recycling_fee": 0.00, // Used only when recycling fee is relevant on some products.
          "tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "discount_amount": 0.00, // Only used for discounts summary.
          "returns_amount": 0.00, // Only used for returns summary.
          "recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "money_back": 0.00, // Money back if you pay more and get paid back.
          "money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
        },
        "customer": {
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
        },
        "articles": [
          {
            "number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "name": "Levis Jeans", // Name of the article.
            "quantity": 1.00, // The amount of quantity of that article.
            "quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "vat_code": "1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "sum_vat": 2.00, // The VAT amount for this product.
            "sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          }, {
            "number": "240033",
            "code": "",
            "name": "Black T-shirt Diesel",
            "quantity": 1.00,
            "quantity_type": "st",
            "vat_code": "1",
            "quantity_price_without_vat": 30.00,
            "sum_total_without_vat": 30.00,
            "sum_total_before": 28.00,
            "sum_vat": 7.00,
            "sum_total": 35.00,
            "discount_amount": 2.00,
            "recycling_fee": 0.00
          }
        ],
        "payments": [
          {
            "payment_method": "gift_medium", // Used for each of the transaction handled by a medium. What is to be shown in view for these codes could be fetched before in an RestAPI. If it is done by for example a "gift card" or "cash", most of the lines will just be empty due to the fact of not beeing processed by the bankterminal.
            "currency": "NOK", // The currency code used for this transaction at the moment of purchase.
            "money_back_code": "", // If set, the money in this payment has been put back on this medium calculating all totals to minus. If empty --> normal payment.
            "masked_pan": "", // The check numbers/letters that are used in the transaction.
            "gift_number": "201712315678", // The reference number used on the gift medium that has been used in the transaction.
            "bax_number": "", // Bankterminal nr.
            "national_merchant_nr": "", // National merchant_number given by the bankterminal.
            "date": "", // Date used by the bankterminal or other external units for the transaction (reporting back to the POS for the transaction).
            "timestamp": "", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number": "", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          }, {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp": "",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number": "",
            "payment_amount": 5.00
          }, {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp": "2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number": "00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "format_rules": {
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "extra_logic": {
          // These lines can be flexible and might include a range of objects. Despite
          // this, we see just some to be mandatory for the UI. Some examples could be the
          // following (These could be linked to format rules to know where it should be
          // displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        },
        "updates": [
          {
            "update-time": "2018:03:04+08:52:11",
            "version": 3
          }, {
            "update-time": "2018:02:01+16:12:43",
            "version": 2
          }
        ]
      } 
 
      ];

    return new Promise((resolve, reject) => {
      if (this.workoffline) {
        resolve(receiptParts);
      } else {
        this
          .http
          .get(this.backendURL + "/receipts/1234")
          .map(res => res.json())
          .subscribe(data => {
            if(data) {
              this.storage.set('receipts', data.receipts).then((val) => {
                console.log("Stored receipts for offline use");
              });
              resolve(data.receipts);
            } else {
              this.storage.get('receipts').then((receipts) => {
                if(receipts) {
                  resolve(receipts);
                } else {
                  reject();
                }
              }).catch(() => {
                reject();
              });
            }
          }, err => {
            this.storage.get('receipts').then((receipts) => {
              if(receipts) {
                resolve(receipts);
              } else {
                reject();
              }
            }).catch(() => {
              reject();
            });
          });
      }
    });
  }

}
