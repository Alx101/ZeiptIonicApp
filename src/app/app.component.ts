import {Component} from '@angular/core';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {ResourcesProvider} from '../providers/resources/resources';

@Component({templateUrl: 'app.html'})
export class MyApp {

    rootPage : any;
    loading : any;

    constructor(public resProvider : ResourcesProvider) {}
    ngOnInit() {
        this.resProvider.showInstall();
        this
            .resProvider
            .loadUserStorage()
            .then((user : any) => {
                if (!user) {
                    this.rootPage = LoginPage;
                } else {
                    this
                        .resProvider
                        .loadUserStorage()
                        .then(() => {
                            this.rootPage = HomePage;
                        })
                    
                }
            })
            .catch((err) => {
                console.log(err);
                this.rootPage = LoginPage;
            })
    }

}
