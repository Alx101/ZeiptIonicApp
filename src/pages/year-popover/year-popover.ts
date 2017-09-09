import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the YearPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-year-popover',
  templateUrl: 'year-popover.html',
})
export class YearPopoverPage {
  dataSet:any;
  currentSet:any;

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.dataSet = this.navParams.data.dataSet;
      this.currentSet = this.navParams.data.currentSet;

    }
  }

  close(set) {
    this.viewCtrl.dismiss(set);
  }

}
