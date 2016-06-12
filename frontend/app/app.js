import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
// import {GettingStartedPage} from './pages/getting-started/getting-started';
import {UserJoinPage} from './pages/userJoin/userJoin';
import {ListPage} from './pages/list/list';


@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.platform = platform;

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: '회원가입', component: GettingStartedPage },
      { title: '회원가입', component: UserJoinPage},
      { title: 'List', component: ListPage }
    ];

    this.rootPage = UserJoinPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
