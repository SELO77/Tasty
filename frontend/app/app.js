import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
// import {GettingStartedPage} from './pages/getting-started/getting-started';
import {UserJoinPage} from './pages/userJoin/userJoin';
import {ListPage} from './pages/list/list';
import {IntroPage} from './pages/intro/intro';


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
    this.local = new Storage(LocalStorage);

    this.initializeApp();
    this.local.get('didIntro').then((result) => {
      if(result===null) {
        this.rootPage = IntroPage;
      }else {
        this.rootPage = UserJoinPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
