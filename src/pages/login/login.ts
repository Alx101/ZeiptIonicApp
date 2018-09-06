import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ResourcesProvider} from '../../providers/resources/resources';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {PasswordValidation} from './password-validation';
import {HomePage} from '../home/home';


@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {

    loginUserView : boolean = true;
    registerUserView : boolean = false;

    userForm : FormGroup;

    wrongUser : boolean = false;
    userExists : boolean = false;
    loading : boolean = false;

    emailPattern = /^\S+@\S+\.\S+$/;

    constructor(public navCtrl : NavController, public navParams : NavParams, public resProvider : ResourcesProvider, public formBuilder : FormBuilder) {

        this.userForm = formBuilder.group({
            username: [
                '', Validators.compose([
                    Validators.pattern(this.emailPattern),
                    Validators.required
                ])
            ],
            password: [
                '', Validators.compose([Validators.required])
            ]
        });
    }

    toggleInstall(){
        document.getElementById("addToHome").classList.toggle("closed");
        document.getElementById("addToHome-fade").classList.toggle("closed");
    }

    loginView() {
        this.registerUserView = false;
        this.loginUserView = true;
        this.userForm.setValidators(null);
        this.userForm.removeControl('confirmPassword');
    }
    registerView() {
        this.userForm.addControl('confirmPassword', new FormControl('', Validators.compose([Validators.required])));
        this.userForm.setValidators(PasswordValidation.MatchPassword);
        this.loginUserView = false;
        this.registerUserView = true;
    }

    loginUser() {
        this.loading = true;
        this
            .resProvider
            .loginUser(this.userForm.value.username, this.userForm.value.password)
            .then((data : any) => {
                console.log(data);
                this.loading = false;
                if (data.success == 1) {
                    this
                        .resProvider
                        .loadCards()
                        .then(() => {
                            this
                                .resProvider
                                .loadReceipts()
                                .then(() => {
                                    this
                                        .navCtrl
                                        .setRoot(HomePage, {}, {
                                            animate: true,
                                            direction: 'forward'
                                        })
                                })
                        })
                } else {
                    
                    this.wrongUser = true;
                    setTimeout(() => {
                        this.wrongUser = false;
                    }, 4000);
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }

    registerUser() {
        this.loading = true;
        this
            .resProvider
            .registerUser(this.userForm.value.username, this.userForm.value.password)
            .then((data : any) => {
                this.loading = false;
                if (data.success == 1) {
                    this
                        .navCtrl
                        .setRoot(HomePage, {}, {
                            animate: true,
                            direction: 'forward'
                        });
                } else {

                    this.userExists = true;
                    setTimeout(() => {
                        this.userExists = false;
                    }, 4000);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
}