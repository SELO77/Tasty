import {Page, NavController, Storage, LocalStorage, Alert, Loading} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {UserJoinPage} from "../userJoin/userJoin";

@Page({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
  static get parameters(){
    return [[NavController]];
  }

  constructor(nav){
    this.nav = nav;
    this.local = new Storage(LocalStorage);
    this.loading = Loading.create({
      content: 'Authenticating...'
    });

    //Hold values from Facebook
    this.fbid = null;
    this.userName = null;
    this.userEmail = null;
    this.picture = null;
  }

  login() {
    this.nav.present(this.loading);

    Facebook.login(['email']).then((response)=>{
      this.getProfile();
    }, (err) => {
      let alert = Alert.create({
        title: '이런..',
        subTitle: '페이스북 로그인 인증에 실패했습니다.',
        buttons: ['확인']
      });
      this.loading.dismiss();
      this.nav.present(alert);
    });
  }

  getProfile() {
    Facebook.api('/me?fields=id,name,email', ['email']).then(
      (response) => {
        console.log('hehehe', response);

        this.fbid = response.id;
        this.userName = response.name;
        this.userEmail = response.email;
        // this.picture = response.picture.data.url;

        // API에 페북에서 받은 정보를 보낸다.
        let alert = Alert.create({
          title: '와우...',
          subTitle: '축하합니다 ' + this.userName + '님. 회원님의 아이디는 ' + this.userEmail + ' 입니다.',
          buttons: ['확인']
        });
        this.loading.dismiss();
        this.nav.present(alert);
      },

      (err) => {
        console.log('uuuu', err);
        let alert = Alert.create({
          title: '이런...',
          subTitle: '페이스북 회원정보를 가져올수 없습니다.',
          buttons: ['확인']
        });
        this.loading.dismiss();
        this.nav.present(alert);
      }
    );
  }

  onClickGoUserJoin() {
    // 로컬스토리지에 인트로페이지 방문여부를 저장
    this.local.set('didIntro', true);
    this.nav.setRoot(UserJoinPage);
  }
}
