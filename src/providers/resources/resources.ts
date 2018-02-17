import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

@Injectable()
export class ResourcesProvider {
    cards : any;
    user : any;
    backendURL : string;
    workoffline : boolean = true;

    constructor(public http : Http, public storage : Storage) {
        this.backendURL = "http://demo.zeipt.se/public";
    }
    public clearStorage() {
        this
            .storage
            .clear();
    }
    public loginUser(username) {
        return new Promise((resolve, reject) => {
            if (this.workoffline) {
                let offlineuser = "offlineuser";
                this
                    .storage
                    .set("user", offlineuser);
                resolve(offlineuser);
            } else {
                this
                    .http
                    .get(this.backendURL + "/login")
            }
        })
    }
    public registerUser(username) {
        return new Promise((resolve, reject) => {
            if (this.workoffline) {
                let offlineuser = "offlineuser";
                this
                    .storage
                    .set("user", offlineuser);
                resolve(offlineuser);
            } else {
                this
                    .http
                    .get(this.backendURL + "/registercustomer/" + username)
                    .map(res => res.json())
                    .subscribe(data => {
                        console.log(data);
                        if (data.success == 0) {} else {
                            this
                                .storage
                                .set("user", data.cid)
                                .then((val) => {
                                    console.log("Stored user for offline use");
                                });
                            resolve(data.cid);
                        }
                    }, err => {
                        console.log(err);
                    });
            }
        })
    }

    public loadUser() {
        return new Promise((resolve, reject) => {
            this
                .storage
                .get("user")
                .then((user) => {
                    resolve(user);
                })
                .catch(() => {
                    reject();
                })
        });
    }

    public loadCards() {
        return new Promise((resolve, reject) => {
            if (this.workoffline) {
                let cards = [
                    {
                        'lastfour': '1111',
                        'type': 'Visa',
                        'added': 'Thu Aug 03 2017 06:10:10 GMT+0200 (CEST)',
                        'expires': '08/21',
                        'name': 'Bjørn Johannessen'
                    }, {
                        'lastfour': '1234',
                        'type': 'Mastercard',
                        'added': 'Sat Aug 19 2017 04:19:48 GMT+0200 (CEST)',
                        'expires': '02/23',
                        'name': 'Bjørn Johannessen'
                    }
                ];
                resolve(cards);
            } else {
                this
                    .http
                    .get(this.backendURL + "/cards/1234")
                    .map(res => res.json())
                    .subscribe(data => {
                        if (data.success == 0) {
                            this
                                .storage
                                .get('cards')
                                .then((cards) => {
                                    resolve(cards);
                                })
                                .catch(() => {
                                    reject();
                                });
                        } else {
                            this
                                .storage
                                .set('cards', data.cards)
                                .then((val) => {
                                    console.log("Stored cards for offline use");
                                });
                            resolve(data.cards);
                        }
                    }, err => {
                        //TODO: Fetch from cache
                        this
                            .storage
                            .get('cards')
                            .then((cards) => {
                                resolve(cards);
                            })
                            .catch(() => {
                                reject();
                            });
                    });
            }
        });
    }

    // Fetch receipts. Should be fetched from backend though, so this is temporary.
    // Todo: connect to backend
    public loadReceiptJson() {
        let receiptJson = [
            {
                "reference": {
                    "zeipt_token": "5a736fed6449f3f55076b09a",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 98.51
                },
                "merchant": {
                    "name": "Mantrix",
                    "org_nr": 915285787,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Jenkinsville",
                    "zip_code": 3196,
                    "address": "Monitor Street 41",
                    "phone": "0047 93280489",
                    "email": "hodgefuentes@hopeli.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Mantrix"
                },
                "receipt": {
                    "receipt_nr": 3918024,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 38,
                    "date": "2017-07-27",
                    "time": "10:06:27"
                },
                "sum": {
                    "total": 1138.73,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 711.45,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed09d54c53cb3fd710",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 9.36
                },
                "merchant": {
                    "name": "Translink",
                    "org_nr": 959822789,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Layhill",
                    "zip_code": 3516,
                    "address": "Colonial Road 37",
                    "phone": "0047 96084318",
                    "email": "reillydelaney@intradisk.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Translink"
                },
                "receipt": {
                    "receipt_nr": 697059,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 48,
                    "date": "2017-07-21",
                    "time": "08:43:24"
                },
                "sum": {
                    "total": 326.67,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 719.05,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedc769e807ec8a52c4",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 47.73
                },
                "merchant": {
                    "name": "Kinetica",
                    "org_nr": 987051931,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Durham",
                    "zip_code": 3049,
                    "address": "Victor Road 41",
                    "phone": "0047 96451178",
                    "email": "bryantmaddox@exoswitch.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Kinetica"
                },
                "receipt": {
                    "receipt_nr": 3839105,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 50,
                    "date": "2017-10-29",
                    "time": "09:55:29"
                },
                "sum": {
                    "total": 3025.87,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 122.88,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed7f09d17a3049d51c",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 63.21
                },
                "merchant": {
                    "name": "Golistic",
                    "org_nr": 938164370,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Faywood",
                    "zip_code": 8421,
                    "address": "Hubbard Street 1",
                    "phone": "0047 99628390",
                    "email": "bryanvang@biohab.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Golistic"
                },
                "receipt": {
                    "receipt_nr": 9923731,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 87,
                    "date": "2017-09-24",
                    "time": "05:07:35"
                },
                "sum": {
                    "total": 2817.71,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 251.84,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed2bd6eb809410c9bd",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 85.84
                },
                "merchant": {
                    "name": "Bluplanet",
                    "org_nr": 914784307,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Jackpot",
                    "zip_code": 4357,
                    "address": "Halsey Street 7",
                    "phone": "0047 93806342",
                    "email": "annmorin@indexia.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Bluplanet"
                },
                "receipt": {
                    "receipt_nr": 4698709,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 57,
                    "date": "2017-04-06",
                    "time": "05:45:48"
                },
                "sum": {
                    "total": 1654.25,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 946.31,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed5d411cfbace7bead",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 38.35
                },
                "merchant": {
                    "name": "Ecolight",
                    "org_nr": 944347153,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Beaverdale",
                    "zip_code": 4473,
                    "address": "Richards Street 50",
                    "phone": "0047 93421721",
                    "email": "churchbenton@valreda.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Ecolight"
                },
                "receipt": {
                    "receipt_nr": 6543944,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 82,
                    "date": "2017-06-02",
                    "time": "10:38:12"
                },
                "sum": {
                    "total": 1422.8,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 797.98,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedfc581adc342a6ded",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 98.28
                },
                "merchant": {
                    "name": "Skybold",
                    "org_nr": 991681656,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Vernon",
                    "zip_code": 618,
                    "address": "Prescott Place 44",
                    "phone": "0047 93259997",
                    "email": "kayecote@techade.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Skybold"
                },
                "receipt": {
                    "receipt_nr": 3130749,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 85,
                    "date": "2017-02-13",
                    "time": "05:43:20"
                },
                "sum": {
                    "total": 1166.23,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 188.99,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed90ac40f96473276e",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 71.08
                },
                "merchant": {
                    "name": "Petigems",
                    "org_nr": 940963159,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Imperial",
                    "zip_code": 7052,
                    "address": "Garden Street 4",
                    "phone": "0047 91359615",
                    "email": "lourdeshensley@namegen.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Petigems"
                },
                "receipt": {
                    "receipt_nr": 472237,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 27,
                    "date": "2017-09-16",
                    "time": "11:18:47"
                },
                "sum": {
                    "total": 1044.12,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 448.49,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed9b647cebe5692394",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 75.85
                },
                "merchant": {
                    "name": "Digial",
                    "org_nr": 929868443,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Hachita",
                    "zip_code": 1568,
                    "address": "Cox Place 47",
                    "phone": "0047 91482803",
                    "email": "patsyball@gynko.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Digial"
                },
                "receipt": {
                    "receipt_nr": 6256368,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 76,
                    "date": "2017-08-23",
                    "time": "07:26:01"
                },
                "sum": {
                    "total": 1632.24,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 295.89,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed4c7e699ec46c8ae1",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 15.66
                },
                "merchant": {
                    "name": "Filodyne",
                    "org_nr": 986942860,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Grazierville",
                    "zip_code": 8118,
                    "address": "Fillmore Avenue 12",
                    "phone": "0047 94146316",
                    "email": "pamelajustice@xixan.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Filodyne"
                },
                "receipt": {
                    "receipt_nr": 7685899,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 59,
                    "date": "2017-01-04",
                    "time": "03:11:16"
                },
                "sum": {
                    "total": 637.83,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 38.67,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed3b1fe697fb525790",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 32.41
                },
                "merchant": {
                    "name": "Grok",
                    "org_nr": 914963756,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Chicopee",
                    "zip_code": 2859,
                    "address": "Holmes Lane 21",
                    "phone": "0047 97446319",
                    "email": "prattchristensen@comvene.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Grok"
                },
                "receipt": {
                    "receipt_nr": 1656081,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 93,
                    "date": "2018-01-01",
                    "time": "12:39:05"
                },
                "sum": {
                    "total": 230.93,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 386.89,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed6f7d2cda320e4e86",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 14.21
                },
                "merchant": {
                    "name": "Isosure",
                    "org_nr": 918493110,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Strong",
                    "zip_code": 9152,
                    "address": "Estate Road 9",
                    "phone": "0047 95503176",
                    "email": "ivywilliam@besto.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Isosure"
                },
                "receipt": {
                    "receipt_nr": 4716489,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 56,
                    "date": "2017-07-17",
                    "time": "10:43:03"
                },
                "sum": {
                    "total": 2379.83,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 322.28,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed179de6259d439b84",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 89
                },
                "merchant": {
                    "name": "Cubicide",
                    "org_nr": 931486210,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Coalmont",
                    "zip_code": 5761,
                    "address": "Barlow Drive 29",
                    "phone": "0047 92745668",
                    "email": "hendricksthornton@halap.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Cubicide"
                },
                "receipt": {
                    "receipt_nr": 7897652,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 32,
                    "date": "2018-01-28",
                    "time": "12:59:16"
                },
                "sum": {
                    "total": 1512.06,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 591.67,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736feddd8d0349d11f93a7",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 30.9
                },
                "merchant": {
                    "name": "Splinx",
                    "org_nr": 992453875,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Virgie",
                    "zip_code": 1888,
                    "address": "Lee Avenue 14",
                    "phone": "0047 93856455",
                    "email": "anthonycraig@apexia.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Splinx"
                },
                "receipt": {
                    "receipt_nr": 8979821,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 41,
                    "date": "2017-09-09",
                    "time": "10:11:50"
                },
                "sum": {
                    "total": 1036.61,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 673.98,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed1dc3d458ec233a74",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 0.91
                },
                "merchant": {
                    "name": "Turnling",
                    "org_nr": 907950051,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Richford",
                    "zip_code": 157,
                    "address": "Dennett Place 25",
                    "phone": "0047 99357259",
                    "email": "inezeverett@illumity.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Turnling"
                },
                "receipt": {
                    "receipt_nr": 522899,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 50,
                    "date": "2017-12-16",
                    "time": "03:47:58"
                },
                "sum": {
                    "total": 1582.84,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 170.51,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed6d66bad1b6db15b9",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 43.83
                },
                "merchant": {
                    "name": "Enervate",
                    "org_nr": 980966209,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Flintville",
                    "zip_code": 7824,
                    "address": "Montgomery Place 16",
                    "phone": "0047 91212667",
                    "email": "hulljennings@ewaves.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Enervate"
                },
                "receipt": {
                    "receipt_nr": 7061976,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 29,
                    "date": "2017-06-15",
                    "time": "06:42:53"
                },
                "sum": {
                    "total": 1618.81,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 284.09,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed9a920604dc79cc45",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 25.15
                },
                "merchant": {
                    "name": "Anacho",
                    "org_nr": 960442517,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Cedarville",
                    "zip_code": 7606,
                    "address": "Canton Court 13",
                    "phone": "0047 95937929",
                    "email": "dorseyallen@geeknet.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Anacho"
                },
                "receipt": {
                    "receipt_nr": 4245747,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 38,
                    "date": "2017-02-25",
                    "time": "04:50:15"
                },
                "sum": {
                    "total": 2866.08,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 284.66,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedc3fa39c351f1a63f",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 87.04
                },
                "merchant": {
                    "name": "Inrt",
                    "org_nr": 910837373,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Chelsea",
                    "zip_code": 2665,
                    "address": "Fleet Walk 17",
                    "phone": "0047 98694427",
                    "email": "reynavalenzuela@circum.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Inrt"
                },
                "receipt": {
                    "receipt_nr": 5438167,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 56,
                    "date": "2017-09-16",
                    "time": "04:20:16"
                },
                "sum": {
                    "total": 2205.58,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 693,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedbef625c972568b43",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 68.99
                },
                "merchant": {
                    "name": "Zerology",
                    "org_nr": 954215145,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Soham",
                    "zip_code": 5205,
                    "address": "Plaza Street 46",
                    "phone": "0047 93229871",
                    "email": "morganrose@zoinage.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Zerology"
                },
                "receipt": {
                    "receipt_nr": 7650378,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 43,
                    "date": "2017-06-23",
                    "time": "06:07:12"
                },
                "sum": {
                    "total": 2818.57,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 182.09,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedcd5160e1e228f14d",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 28.41
                },
                "merchant": {
                    "name": "Geeketron",
                    "org_nr": 911253491,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Cowiche",
                    "zip_code": 9956,
                    "address": "Degraw Street 13",
                    "phone": "0047 92243615",
                    "email": "oneillmartin@pearlessa.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Geeketron"
                },
                "receipt": {
                    "receipt_nr": 6211875,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 9,
                    "date": "2017-01-24",
                    "time": "10:25:03"
                },
                "sum": {
                    "total": 1159.23,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 530.59,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed3eff34b805a709bd",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 43.6
                },
                "merchant": {
                    "name": "Uberlux",
                    "org_nr": 961348367,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Choctaw",
                    "zip_code": 8553,
                    "address": "Duryea Court 47",
                    "phone": "0047 97506955",
                    "email": "dodsonriddle@entropix.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Uberlux"
                },
                "receipt": {
                    "receipt_nr": 2007255,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 9,
                    "date": "2017-07-05",
                    "time": "12:09:13"
                },
                "sum": {
                    "total": 3255.64,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 256.82,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed1d132649dd3a6d34",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 16.37
                },
                "merchant": {
                    "name": "Gleamink",
                    "org_nr": 914244607,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Venice",
                    "zip_code": 7691,
                    "address": "Ocean Avenue 45",
                    "phone": "0047 91612491",
                    "email": "ramossummers@frosnex.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Gleamink"
                },
                "receipt": {
                    "receipt_nr": 4054719,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 66,
                    "date": "2017-07-16",
                    "time": "12:39:20"
                },
                "sum": {
                    "total": 2306.79,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 531.57,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedf6bb43a745a781c4",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 91.27
                },
                "merchant": {
                    "name": "Optique",
                    "org_nr": 986222900,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Innsbrook",
                    "zip_code": 4422,
                    "address": "Arion Place 2",
                    "phone": "0047 93127649",
                    "email": "janieschultz@talae.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Optique"
                },
                "receipt": {
                    "receipt_nr": 7793815,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 96,
                    "date": "2017-08-03",
                    "time": "02:47:00"
                },
                "sum": {
                    "total": 2794.5,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 761.1,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedd95871bba1f72a12",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 72.58
                },
                "merchant": {
                    "name": "Suremax",
                    "org_nr": 948893565,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Bartonsville",
                    "zip_code": 1647,
                    "address": "Norman Avenue 13",
                    "phone": "0047 91233443",
                    "email": "masseyrutledge@remold.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Suremax"
                },
                "receipt": {
                    "receipt_nr": 5915700,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 66,
                    "date": "2017-06-19",
                    "time": "10:44:09"
                },
                "sum": {
                    "total": 445.45,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 180.2,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed0d80b2ac50758f60",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 5.2
                },
                "merchant": {
                    "name": "Viasia",
                    "org_nr": 920256410,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Waiohinu",
                    "zip_code": 8421,
                    "address": "Huntington Street 50",
                    "phone": "0047 97023578",
                    "email": "rosaliewilkinson@uxmox.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Viasia"
                },
                "receipt": {
                    "receipt_nr": 377387,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 4,
                    "date": "2017-02-01",
                    "time": "03:37:31"
                },
                "sum": {
                    "total": 2039.66,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 648.71,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed8e91de469a04b579",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 28.55
                },
                "merchant": {
                    "name": "Anocha",
                    "org_nr": 966564976,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Thatcher",
                    "zip_code": 7330,
                    "address": "Woodrow Court 4",
                    "phone": "0047 92185717",
                    "email": "malindamcfadden@kiggle.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Anocha"
                },
                "receipt": {
                    "receipt_nr": 4210067,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 68,
                    "date": "2017-02-24",
                    "time": "12:54:41"
                },
                "sum": {
                    "total": 207.74,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 544.98,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed8827127d96becfdc",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 37
                },
                "merchant": {
                    "name": "Primordia",
                    "org_nr": 918816681,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Alafaya",
                    "zip_code": 8921,
                    "address": "Sheffield Avenue 48",
                    "phone": "0047 90621625",
                    "email": "elmaroy@boilcat.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Primordia"
                },
                "receipt": {
                    "receipt_nr": 222310,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 73,
                    "date": "2017-12-15",
                    "time": "07:10:42"
                },
                "sum": {
                    "total": 2283.12,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 586.04,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed9ed68c7f4faee2d5",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 8.38
                },
                "merchant": {
                    "name": "Rockyard",
                    "org_nr": 995685001,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Kennedyville",
                    "zip_code": 342,
                    "address": "Butler Street 39",
                    "phone": "0047 97913117",
                    "email": "gloverhuber@newcube.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Rockyard"
                },
                "receipt": {
                    "receipt_nr": 6439530,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 88,
                    "date": "2017-08-19",
                    "time": "04:19:48"
                },
                "sum": {
                    "total": 1122.95,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 993.55,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed840f059e73572ede",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 40.61
                },
                "merchant": {
                    "name": "Retrotex",
                    "org_nr": 925628349,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Dotsero",
                    "zip_code": 4481,
                    "address": "Scholes Street 47",
                    "phone": "0047 97773928",
                    "email": "beatrizwynn@eternis.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Retrotex"
                },
                "receipt": {
                    "receipt_nr": 8762698,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 62,
                    "date": "2017-04-22",
                    "time": "01:06:00"
                },
                "sum": {
                    "total": 2126.97,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 399.68,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed466b705029d88f20",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 8.45
                },
                "merchant": {
                    "name": "Suretech",
                    "org_nr": 978840747,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Crumpler",
                    "zip_code": 8990,
                    "address": "Caton Avenue 33",
                    "phone": "0047 91616984",
                    "email": "vancecharles@quotezart.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Suretech"
                },
                "receipt": {
                    "receipt_nr": 2404741,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 21,
                    "date": "2017-09-10",
                    "time": "01:56:30"
                },
                "sum": {
                    "total": 3819.86,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 789.33,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedb0da3d06583d42d0",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 0.7
                },
                "merchant": {
                    "name": "Zensure",
                    "org_nr": 913330683,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Edgewater",
                    "zip_code": 8473,
                    "address": "Williamsburg Street 35",
                    "phone": "0047 93592691",
                    "email": "chaneykirby@isologics.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Zensure"
                },
                "receipt": {
                    "receipt_nr": 1377658,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 60,
                    "date": "2017-01-27",
                    "time": "12:20:21"
                },
                "sum": {
                    "total": 985.9,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 783.77,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedc737fc1896d8fba9",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 49.86
                },
                "merchant": {
                    "name": "Terascape",
                    "org_nr": 965809455,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Broadlands",
                    "zip_code": 1075,
                    "address": "Rutledge Street 26",
                    "phone": "0047 93860748",
                    "email": "francismayo@jimbies.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Terascape"
                },
                "receipt": {
                    "receipt_nr": 1347136,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 72,
                    "date": "2017-08-22",
                    "time": "11:38:47"
                },
                "sum": {
                    "total": 2320.78,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 384.05,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedfa502c8d77803828",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 32.97
                },
                "merchant": {
                    "name": "Grupoli",
                    "org_nr": 937367408,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Eagletown",
                    "zip_code": 6319,
                    "address": "Arlington Avenue 36",
                    "phone": "0047 93157072",
                    "email": "chanmcneil@isodrive.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Grupoli"
                },
                "receipt": {
                    "receipt_nr": 7192440,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 33,
                    "date": "2017-07-02",
                    "time": "09:23:26"
                },
                "sum": {
                    "total": 2012.33,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 430.73,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed20501026ed6c435c",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 20.25
                },
                "merchant": {
                    "name": "Bytrex",
                    "org_nr": 960491179,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Cataract",
                    "zip_code": 6800,
                    "address": "Robert Street 15",
                    "phone": "0047 93953170",
                    "email": "tarabriggs@deminimum.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Bytrex"
                },
                "receipt": {
                    "receipt_nr": 3256982,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 35,
                    "date": "2017-07-17",
                    "time": "12:55:05"
                },
                "sum": {
                    "total": 696.89,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 94.92,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fede2e843f953064ff8",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 94.99
                },
                "merchant": {
                    "name": "Netbook",
                    "org_nr": 927438799,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Why",
                    "zip_code": 5468,
                    "address": "Ivan Court 9",
                    "phone": "0047 94591740",
                    "email": "ayalaflynn@fibrodyne.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Netbook"
                },
                "receipt": {
                    "receipt_nr": 8091207,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 28,
                    "date": "2017-09-02",
                    "time": "03:20:21"
                },
                "sum": {
                    "total": 1582.97,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 555.12,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedfa7840177b365045",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 25.7
                },
                "merchant": {
                    "name": "Wazzu",
                    "org_nr": 903863720,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Brazos",
                    "zip_code": 982,
                    "address": "Greenpoint Avenue 19",
                    "phone": "0047 97092239",
                    "email": "bridgetclarke@multron.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Wazzu"
                },
                "receipt": {
                    "receipt_nr": 2702361,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 12,
                    "date": "2017-12-14",
                    "time": "01:45:24"
                },
                "sum": {
                    "total": 3199.61,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 765.26,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed7d91b3ecb96c036c",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 45.16
                },
                "merchant": {
                    "name": "Qimonk",
                    "org_nr": 982687375,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Canoochee",
                    "zip_code": 8196,
                    "address": "School Lane 46",
                    "phone": "0047 95133182",
                    "email": "hickshodges@digique.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Qimonk"
                },
                "receipt": {
                    "receipt_nr": 8902485,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 3,
                    "date": "2017-07-28",
                    "time": "10:27:10"
                },
                "sum": {
                    "total": 3923.81,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 677.59,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed162945883fecce19",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 70.69
                },
                "merchant": {
                    "name": "Geekwagon",
                    "org_nr": 943324144,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Edneyville",
                    "zip_code": 4900,
                    "address": "Howard Avenue 6",
                    "phone": "0047 91620108",
                    "email": "rowlandguzman@squish.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Geekwagon"
                },
                "receipt": {
                    "receipt_nr": 8250088,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 72,
                    "date": "2017-06-08",
                    "time": "01:09:26"
                },
                "sum": {
                    "total": 1991.73,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 964.91,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed9d39ec2d04f02146",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 38.21
                },
                "merchant": {
                    "name": "Pyrami",
                    "org_nr": 948177974,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Oberlin",
                    "zip_code": 7931,
                    "address": "Allen Avenue 7",
                    "phone": "0047 90429212",
                    "email": "veramoran@makingway.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Pyrami"
                },
                "receipt": {
                    "receipt_nr": 7925437,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 85,
                    "date": "2017-03-09",
                    "time": "09:57:23"
                },
                "sum": {
                    "total": 2467.61,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 182.09,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed1697cc4bfcaa9331",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 69.74
                },
                "merchant": {
                    "name": "Zipak",
                    "org_nr": 955720793,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Chilton",
                    "zip_code": 6426,
                    "address": "Hart Street 12",
                    "phone": "0047 94411224",
                    "email": "solishaley@slumberia.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Zipak"
                },
                "receipt": {
                    "receipt_nr": 2633039,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 3,
                    "date": "2017-04-20",
                    "time": "05:54:46"
                },
                "sum": {
                    "total": 2005.93,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 203.78,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed229d0b6712fe17f6",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 47.28
                },
                "merchant": {
                    "name": "Cormoran",
                    "org_nr": 989428450,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Dorneyville",
                    "zip_code": 489,
                    "address": "Stewart Street 40",
                    "phone": "0047 92022985",
                    "email": "theresedaugherty@qnekt.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Cormoran"
                },
                "receipt": {
                    "receipt_nr": 5078281,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 21,
                    "date": "2017-08-25",
                    "time": "02:30:38"
                },
                "sum": {
                    "total": 3591.95,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 597.33,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed71c4ae83a8a615aa",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 77.33
                },
                "merchant": {
                    "name": "Kidgrease",
                    "org_nr": 998967202,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Cartwright",
                    "zip_code": 4061,
                    "address": "Ralph Avenue 19",
                    "phone": "0047 96412217",
                    "email": "annettedoyle@geoforma.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Kidgrease"
                },
                "receipt": {
                    "receipt_nr": 6054550,
                    "receipt_type": "Elektronisk utleveringsseddel",
                    "pos_id": 37,
                    "date": "2017-12-27",
                    "time": "04:14:16"
                },
                "sum": {
                    "total": 3969.96,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 636.88,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedc7af4d457d1d36dc",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 79.32
                },
                "merchant": {
                    "name": "Comtour",
                    "org_nr": 942266230,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Madrid",
                    "zip_code": 4410,
                    "address": "Beverley Road 12",
                    "phone": "0047 93498214",
                    "email": "leegraham@futurity.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Comtour"
                },
                "receipt": {
                    "receipt_nr": 2241099,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 75,
                    "date": "2017-12-26",
                    "time": "05:24:45"
                },
                "sum": {
                    "total": 667.05,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 548.89,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "bankaxept",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedacb4a22507799fff",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 4.49
                },
                "merchant": {
                    "name": "Omnigog",
                    "org_nr": 990288809,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Delwood",
                    "zip_code": 174,
                    "address": "Homecrest Avenue 6",
                    "phone": "0047 98279015",
                    "email": "bridgetteedwards@maineland.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Omnigog"
                },
                "receipt": {
                    "receipt_nr": 5388228,
                    "receipt_type": "Elektronisk proforma-kvittering",
                    "pos_id": 31,
                    "date": "2017-06-06",
                    "time": "11:30:44"
                },
                "sum": {
                    "total": 442.31,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 175.22,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedb4618a132b87197f",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 98.64
                },
                "merchant": {
                    "name": "Techtrix",
                    "org_nr": 922507176,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Boonville",
                    "zip_code": 112,
                    "address": "Tennis Court 31",
                    "phone": "0047 99919420",
                    "email": "dionnebean@extragene.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Techtrix"
                },
                "receipt": {
                    "receipt_nr": 6105488,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 75,
                    "date": "2017-03-26",
                    "time": "07:55:39"
                },
                "sum": {
                    "total": 739.53,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 472.49,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed43cbae2daa260515",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 93.95
                },
                "merchant": {
                    "name": "Zilladyne",
                    "org_nr": 929357471,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Garnet",
                    "zip_code": 7059,
                    "address": "Brightwater Avenue 6",
                    "phone": "0047 98745581",
                    "email": "caitlinsweeney@isoswitch.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Zilladyne"
                },
                "receipt": {
                    "receipt_nr": 9093106,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 51,
                    "date": "2017-10-30",
                    "time": "02:23:51"
                },
                "sum": {
                    "total": 3562.11,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 277.26,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed1f56091eb5b1c538",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 65.23
                },
                "merchant": {
                    "name": "Pholio",
                    "org_nr": 970227170,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Calverton",
                    "zip_code": 9089,
                    "address": "Macon Street 25",
                    "phone": "0047 99992933",
                    "email": "bonniejensen@accidency.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Pholio"
                },
                "receipt": {
                    "receipt_nr": 9639159,
                    "receipt_type": "Elektronisk returkvittering",
                    "pos_id": 3,
                    "date": "2017-08-03",
                    "time": "06:10:10"
                },
                "sum": {
                    "total": 2043.22,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 10.19,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "gift_medium"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed045ba8cfc7a60d26",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 43.63
                },
                "merchant": {
                    "name": "Plutorque",
                    "org_nr": 900979211,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Felt",
                    "zip_code": 3740,
                    "address": "Midwood Street 15",
                    "phone": "0047 91741931",
                    "email": "beverlyknowles@digirang.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Plutorque"
                },
                "receipt": {
                    "receipt_nr": 7280439,
                    "receipt_type": "Elektronisk salgskvittering",
                    "pos_id": 74,
                    "date": "2017-12-23",
                    "time": "08:22:20"
                },
                "sum": {
                    "total": 1985.86,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 348.72,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "cash",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fed65ed39971bcd020b",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 88.43
                },
                "merchant": {
                    "name": "Orbalix",
                    "org_nr": 932849111,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Bonanza",
                    "zip_code": 304,
                    "address": "Truxton Street 4",
                    "phone": "0047 93798385",
                    "email": "rosannehoward@pasturia.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Orbalix"
                },
                "receipt": {
                    "receipt_nr": 7039765,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 55,
                    "date": "2016-03-15",
                    "time": "07:09:07"
                },
                "sum": {
                    "total": 1492.93,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 258.83,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "cash"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }, {
                "reference": {
                    "zeipt_token": "5a736fedb2764d2e7075eeb2",
                    "zeipt_receipt_v": "0.88.0",
                    "reference_of_origin": "",
                    "reference_of_origin_old": "",
                    "pos_org_nr": "",
                    "pos_vat_nr": "",
                    "pos_name": "POSNAME",
                    "pos_v": 38.29
                },
                "merchant": {
                    "name": "Quarex",
                    "org_nr": 902111306,
                    "vat_nr": "MVA",
                    "country_code": 4,
                    "city": "Lithium",
                    "zip_code": 4366,
                    "address": "Hendrickson Place 35",
                    "phone": "0047 99514038",
                    "email": "bernicejordan@micronaut.com",
                    "website": "https://zeipt.com",
                    "logo": "http://via.placeholder.com/300x300.png/0F2841/3CBF71?text=Quarex"
                },
                "receipt": {
                    "receipt_nr": 2980591,
                    "receipt_type": "Elektronisk treningskvittering",
                    "pos_id": 37,
                    "date": "2017-02-02",
                    "time": "11:57:46"
                },
                "sum": {
                    "total": 1303.47,
                    "currency": "NOK",
                    "vat_codes": 1,
                    "vat": 0,
                    "without_vat_discount": 0,
                    "after_return_without_vat_discount": 0,
                    "recycling_fee": 0,
                    "tip": 692.35,
                    "discount_amount": 0,
                    "returns_amount": 0,
                    "recycling_moneyback": 0,
                    "money_back": 0,
                    "money_back_method": "",
                    "payments_methods": "bankaxept"
                },
                "customer": {
                    "customer_id": "123i40123ss9d12g3023",
                    "customer_name": "Sebastian Torbjörn Rundqvist"
                },
                "articles": [
                    {
                        "number": 230023,
                        "code": "",
                        "name": "Levis Jeans",
                        "quantity": 1,
                        "quantity_type": "st",
                        "vat_code": 1,
                        "quantity_price_without_vat": 8,
                        "sum_total_without_vat": 8,
                        "sum_total_before": 8,
                        "sum_vat": 2,
                        "sum_total": 10,
                        "discount_amount": 0,
                        "recycling_fee": 0
                    }
                ],
                "payments": [
                    {
                        "payment_method": "gift_medium",
                        "currency": "NOK",
                        "money_back_code": "",
                        "masked_pan": "",
                        "gift_number": 201712315678,
                        "bax_number": "",
                        "national_merchant_nr": "",
                        "date": "",
                        "timestamp": "",
                        "ref_number": "",
                        "aid_number": "",
                        "tvr_number": "",
                        "tsi_number": "",
                        "respons_number": "",
                        "payment_amount": 5
                    }
                ],
                "format_rules": {
                    "logo_placement": "up, left"
                },
                "extra_logic": {
                    "pos_qr_code": 124532432,
                    "pos_qr_code_version": 1.45,
                    "pos_bar_code": "S0019198890",
                    "employee_id": 432,
                    "employee_name": "Sebastian",
                    "employee_text": "Du ble hjulpet av",
                    "pos_goodbye_message": "Tack för köpet, välkommen tillbaka"
                },
                "updates": [
                    {
                        "update_time": "2018:03:04+08:52:11",
                        "version": 3
                    }, {
                        "update_time": "2018:02:01+16:12:43",
                        "version": 2
                    }
                ]
            }
        ];

        return new Promise((resolve, reject) => {
            if (this.workoffline) {
                resolve(receiptJson);
            } else {
                this
                    .http
                    .get(this.backendURL + "/receipts/1234")
                    .map(res => res.json())
                    .subscribe(data => {
                        if (data) {
                            this
                                .storage
                                .set('receipts', data.receipts)
                                .then((val) => {
                                    console.log("Stored receipts for offline use");
                                });
                            resolve(data.receipts);
                        } else {
                            this
                                .storage
                                .get('receipts')
                                .then((receipts) => {
                                    if (receipts) {
                                        resolve(receipts);
                                    } else {
                                        reject();
                                    }
                                })
                                .catch(() => {
                                    reject();
                                });
                        }
                    }, err => {
                        this
                            .storage
                            .get('receipts')
                            .then((receipts) => {
                                if (receipts) {
                                    resolve(receipts);
                                } else {
                                    reject();
                                }
                            })
                            .catch(() => {
                                reject();
                            });
                    });
            }
        });

    }

}
