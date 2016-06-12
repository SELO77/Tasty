import {Component} from '@angular/core';
import {Platform, NavController, MenuController, Alert, Loading, Page} from 'ionic-angular';
import {Facebook} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/userLogin/userLogin.html',
})
export class userLoginPage {
  static get parameters() {
    return [[Loading], [NavController], [MenuController]];
  }

  constructor(loading, nav, menu) {
    this.loading = loading;
    this.nav = nav;
    this.menu = menu;

    this.loading = loading.create({
      content: '인증중...'      // Authenticating...
    });

    this.menu.enable(false);
  }

  login() {

    this.nav.present(this.loading);

    Facebook.login(['public_profile']).then((response) => {

      this.getProfile();

    }, (err) => {

      let alert = Alert.create({
        title: 'Oops!',
        subTitle: 'Something went wrong, please try again later.',
        buttons: ['Ok']
      });

      this.loading.dismiss();
      this.nav.present(alert);

    });

  }

  getProfile(): void {

    Facebook.api('/me?fields=id,name,picture', ['public_profile']).then(

      (response) => {

        console.log(response);
        // 로그인 서비스를 호출
        // this.dataService.fbid = response.id;
        // this.dataService.username = response.name;
        // this.dataService.picture = response.picture.data.url;

        this.menu.enable(true);
        this.loading.dismiss();
        this.nav.setRoot(HomePage);

      }, 

      (err) => {

        console.log(err);

        let alert = Alert.create({
          title: 'Oops!',
          subTitle: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        });

        this.loading.dismiss();
        this.nav.present(alert);

      }

    );

  }

}