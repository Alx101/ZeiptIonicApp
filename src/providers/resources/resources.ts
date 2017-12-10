import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ResourcesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ResourcesProvider {
  cards: any;
  backendURL: string;
  workoffline: boolean = true;

  constructor(public http: Http) {
    this.backendURL = "http://localhost:8000";
  }

  public loadCards() {
    return new Promise((resolve, reject) => {
      console.log("getting cards...");
      if(this.workoffline) {
        let cards = [
          {
            'lastfour': '1111',
            'type': 'Visa'
          }
        ];
        resolve(cards);
      } else {
        this.http.get(this.backendURL + "/cards/1234").map(res => res.json()).subscribe(
          data => {
            console.log(data);
            resolve(data.cards);
          },
          err => {
            //TODO: Fetch from cache
            reject();
          }
        );
      }

    });
  }

  //Fetch receipts. Should be fetched from backend though, so this is temporary. Todo: connect to backend
  public loadReceiptParts() {

    let receiptParts = [
      {
        "reference_logic": { // These lines can be flexible and might include a range of objects. Despite this we see just some of them to be mandatory for the UI. Some examples could be the following:
          "zeipt_receipt_version": "0.84.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old":"", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_number":"", // The org number given to the POS provider producing this receipt.
          "pos_vat_number":"", // The vat number given to the POS provider producing this receipt.
          "pos_name":"", // The name of the POS provider (POS system) producing this receipt.
          "pos_version":"" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant_factors": {
          "merchant_org_number": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "merchant_vat_number":"MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "city": "Oslo", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "Contact_info_phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "Contact_info_email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "Contact_info_website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt_factors": {
          "receipt_number": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by itself.
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
          "date": "2018-01-01", //Date set by the POS for the transaction.
          "time": "14:54:07", // The time set by the POS for the transaction in HH:MM:SS.
          "sum_payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
          "sum_money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "sum_without_discount_vat": 30.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "sum_after_return_without_discount_vat": 20.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "sum_vat_codes":"1", // Summary of what codes has been used for the VAT.
          "sum_vat": 5.00, // The total sum of the VAT.
          "sum_total": 25.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "sum_discount_amount": 2.00, // Only used for discounts summary.
          "sum_returns_amount": 8.00, // Only used for returns summary.
          "sum_tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "sum_money_back": 0.00, // Money back if you pay more and get paid back.
          "sum_recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "sum_recycling_fee": 0.00 // Used only when recycling fee is relevant on some products.
        },
        "format_rules": { // Contains the format factors given by the producer (POS + Operating Merchant) of the receipt to be obeyed by the UI. All these are generalized and limitied due to the restrictions in the UI compatibility.
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "articles": [
          {
            "article_number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "art_code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "art_name": "Levis Jeans", // Name of the article.
            "art_quantity": 1.00, // The amount of quantity of that article.
            "art_quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "art_vat_code":"1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "art_quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "art_sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "art_sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "art_sum_vat": 2.00, // The VAT amount for this product.
            "art_sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "art_discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "art_recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          },
          {
            "article_number": "240033",
            "art_code": "",
            "art_name": "Black T-shirt Diesel",
            "art_quantity": 1.00,
            "art_quantity_type": "st",
            "art_vat_code":"1",
            "art_quantity_price_without_vat": 30.00,
            "art_sum_total_without_vat": 30.00,
            "art_sum_total_before": 28.00,
            "art_sum_vat":  7.00,
            "art_sum_total": 35.00,
            "art_discount_amount": 2.00,
            "art_recycling_fee": 0.00
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
            "timestamp":"", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number":"", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          },
          {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp":"",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number":"",
            "payment_amount": 5.00
          },
          {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp":"2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number":"00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "extra_logic": { // These lines can be flexible and might include a range of objects. Despite this, we see just some to be mandatory for the UI. Some examples could be the following (These could be linked to format rules to know where it should be displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        }
      },
      {
        "reference_logic": { // These lines can be flexible and might include a range of objects. Despite this we see just some of them to be mandatory for the UI. Some examples could be the following:
          "zeipt_receipt_version": "0.84.0", // The version of the file in semantic versioning to keep overview of it compatibility through the update history.
          "reference_of_origin": "", // The hash created between the POS, Zeipt and UI when transmitting the receipt from/to Zeipt as a certifier that this is the legal receipt.
          "reference_of_origin_old":"", // Used to start event for UI that something has happened with the original receipt transfered to them. For example, the user has went back to the store and changed one of the article lines to another article (UI takes the old receipt and compare it to the new, and does the necassary update for the view).
          "pos_org_number":"", // The org number given to the POS provider producing this receipt.
          "pos_vat_number":"", // The vat number given to the POS provider producing this receipt.
          "pos_name":"", // The name of the POS provider (POS system) producing this receipt.
          "pos_version":"" // The version of the POS provider (POS system) sending this receipt.
        },
        "merchant_factors": {
          "merchant_org_number": "918542653", // The org number of the merchant that is operating the store. Not necessarily the owner.
          "merchant_vat_number":"MVA", // The VAT number from the country the operating org number is registred in (if it is VAT registred).
          "city": "Oslo", // The city of the store's location.
          "zip_code": "0566", // The zip code of the store's location.
          "address": "Göteborggata 14E", // The address of the store where the receipt is created.
          "country_code": "4", // The country where the org number of the operator of the store is registred.
          "Contact_info_phone": "004792539720", // The phone number to contact the store with, written in (00:landcode:number) format.
          "Contact_info_email": "Sebastian@zeipt.com", // The email address where the store wants to be reached.
          "Contact_info_website": "https://zeipt.com" // The website address that the operating merchant wants to display on the receipt.
        },
        "receipt_factors": {
          "receipt_number": "445768", // The receipt number given by the POS for the receipt.
          "receipt_type": "Elektronisk salgskvittering", // To know what it refers to by itself, examples: «Elektronisk salgskvittering», «Elektronisk returkvittering»,«Elektronisk proforma-kvittering», «Elektronisk treningskvittering» eller «Elektronisk utleveringsseddel» (om det er faktura).
          "pos_id": "4578", // The unique POS ID given to the receipt by itself.
          "customer_id": "123i40123ss9d12g3023", // Transaction reference number in our system -> changed to the customer ID between Zeipt and the customer interface provider.
          "customer_name": "Sebastian Torbjörn Rundqvist", // You must have the option to add the name of the buyer (if the amount exceeds 40 000 kroner cash for a private customer or if the payment exceeds 1000 kroner for a corporate customer in any given medium, his or her name is required).
          "date": "2018-01-01", //Date set by the POS for the transaction.
          "time": "14:54:07", // The time set by the POS for the transaction in HH:MM:SS.
          "sum_payments_methods": "bankaxept, cash, gift_medium", // What payments that has been done on this receipt (visa-card, cash, giftcard). Directly linked to payments object in the same file.
          "sum_money_back_method": "", // What medium has been used by the customer to get their money back (giftcard, cash, put back on the card etc..).
          "sum_without_discount_vat": 30.00, // The total sum plus tip, rycycling fees before taxes (All amounts are shown with .00 extension).
          "sum_after_return_without_discount_vat": 20.00, // The total sum plus tip, rycycling fees and returns, discounts (before taxes).
          "sum_vat_codes":"1", // Summary of what codes has been used for the VAT.
          "sum_vat": 5.00, // The total sum of the VAT.
          "sum_total": 25.00, // The total sum after all discounts, recycling fees and taxes, plus tip.
          "sum_discount_amount": 2.00, // Only used for discounts summary.
          "sum_returns_amount": 8.00, // Only used for returns summary.
          "sum_tip": 2.00, // The total sum of the tip to the employee (if this is supported).
          "sum_money_back": 0.00, // Money back if you pay more and get paid back.
          "sum_recycling_moneyback": 0.00, // Used only when recycling return has been scanned in the store for either cash out or part payment.
          "sum_recycling_fee": 0.00 // Used only when recycling fee is relevant on some products.
        },
        "format_rules": { // Contains the format factors given by the producer (POS + Operating Merchant) of the receipt to be obeyed by the UI. All these are generalized and limitied due to the restrictions in the UI compatibility.
          "logo_placement": "up, left" // Statement that describes the logo placement
        },
        "articles": [
          {
            "article_number": "230023", // The number of the article that was given by the POS and given to this object as a whole. Every line in the object is a referent to this.
            "art_code": "r", // Article code to know what action is taken on this article, for example return or change, money back etc. Empty for a normal purchase (What is to be shown in the view for these codes could be fetched before in an RestAPi).
            "art_name": "Levis Jeans", // Name of the article.
            "art_quantity": 1.00, // The amount of quantity of that article.
            "art_quantity_type": "st", // Code to be used to define the article quantity type: kg,pc,hg,st etc...
            "art_vat_code":"1", // The code of the VAT on this product (What is to be shown in % view for these codes could be fetched before in an RestAPI).
            "art_quantity_price_without_vat": 8.00, // The per article piece price with VAT.
            "art_sum_total_without_vat": 8.00, // The total article price after quantity calculation without VAT.
            "art_sum_total_before": 8.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee before taxes.
            "art_sum_vat": 2.00, // The VAT amount for this product.
            "art_sum_total": 10.00, // Sum for the article after quantity calculations has been done + discounts and recycling fee after taxes.
            "art_discount_amount": 0.00, // Only used for discounts that triggers on the article_number.
            "art_recycling_fee": 0.00 // Used only when recycling fee is relevant on this product.
          },
          {
            "article_number": "240033",
            "art_code": "",
            "art_name": "Black T-shirt Diesel",
            "art_quantity": 1.00,
            "art_quantity_type": "st",
            "art_vat_code":"1",
            "art_quantity_price_without_vat": 30.00,
            "art_sum_total_without_vat": 30.00,
            "art_sum_total_before": 28.00,
            "art_sum_vat":  7.00,
            "art_sum_total": 35.00,
            "art_discount_amount": 2.00,
            "art_recycling_fee": 0.00
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
            "timestamp":"", // The time of transaction, set by the bankterminal/other external units when reporting to the POS (string_ISO 8601).
            "ref_number": "", // National reference number when the transaction is done digitally.
            "aid_number": "", // Application Identifier. The identifier of the card scheme, received from the card chip.
            "tvr_number": "", // Terminal Verification Results
            "tsi_number": "", // Terminal Status Indicator
            "respons_number":"", // The accepted response from the terminal
            "payment_amount": 5.00 // The final payment amount spent in this transaction
          },
          {
            "payment_method": "cash",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "",
            "gift_number": "",
            "bax_number": "",
            "national_merchant_nr": "",
            "date": "",
            "timestamp":"",
            "ref_number": "",
            "aid_number": "",
            "tvr_number": "",
            "tsi_number": "",
            "respons_number":"",
            "payment_amount": 5.00
          },
          {
            "payment_method": "bankaxept",
            "currency": "NOK",
            "money_back_code": "",
            "masked_pan": "xxxxxxxxxxxxx53364-1",
            "gift_number": "",
            "bax_number": "71408277",
            "national_merchant_nr": "409389",
            "timestamp":"2018:01:01+14:54:08",
            "ref_number": "797089619422934",
            "aid_number": "D5780000021010",
            "tvr_number": "8000048000",
            "tsi_number": "6800",
            "respons_number":"00 godkjent",
            "payment_amount": 15.00
          }
        ],
        "extra_logic": { // These lines can be flexible and might include a range of objects. Despite this, we see just some to be mandatory for the UI. Some examples could be the following (These could be linked to format rules to know where it should be displayed).
          "pos_qr_code": "124532432", // The QR value sent to us for the UI to calculate.
          "pos_qr_code_version": "1.45", // The version and type of the QR code, so that the UI knows how to implement it.
          "pos_bar_code": "S0019198890", // The bar code to be created by the UI on the receipt in the view.
          "employee_id": "432", // The employee ID created by the POS for this login.
          "employee_name": "Sebastian", // The employee name created by the POS for this login.
          "employee_text": "Du ble hjulpet av", // The text that is to be displayed on the receipt before the name. For example (Du ble hjulpet av Sebastian) >>This is to be restricted in size, for screen compatibility<<
          "pos_goodbye_message": "Tack för köpet, välkommen tillbaka" // The message the Operating Merchant might want to add to the view of the receipt >>This is to be restricted in size, for screen compatibility<<
        }
      }
    ];
    
    return new Promise((resolve, reject) => {
      if(this.workoffline) {
        resolve(receiptParts);
      } else {
        let receipts = this.http.get(this.backendURL + "/receipts/1234").map(res => res.json()).subscribe(
          data => {
            resolve(receipts);
          },
          err => {
            //TODO: Fetch from cache
            reject();
          }
        );
      }
    });
  }

}
