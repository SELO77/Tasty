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
    // this.nav.setRoot(UserJoinPage);

    // 아랫부분 테스트를 위해서 임시 주석
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
        this.fbid = response.id;
        this.userName = response.name;
        this.userEmail = response.email;
        // this.picture = response.picture.data.url;

        // API에 페북에서 받은 정보를 보낸다.
        // TODO:: API통신부분은 나중에 한다. 지금은 skip
        let userInfo = {
          fbid: this.fbid,
          name: this.userName,
          email: this.userEmail
        };
        this.local.set('LoginUserInfo', JSON.stringify(userInfo));
        this.local.set('didIntro', true);
        this.loading.dismiss();
        this.nav.setRoot(UserJoinPage);
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

  // onClickGoUserJoin() {
  //   // 로컬스토리지에 인트로페이지 방문여부를 저장
  //   
  //   this.nav.setRoot(UserJoinPage);
  // }
}
