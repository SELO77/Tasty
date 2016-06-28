import {Page, NavController, Storage, LocalStorage} from 'ionic-angular';
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
  }

  onClickGoUserJoin() {
    // 로컬스토리지에 인트로페이지 방문여부를 저장
    this.local.set('didIntro', true);
    this.nav.setRoot(UserJoinPage);
  }
}
