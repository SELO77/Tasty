import {Page, NavController, Storage, LocalStorage, Alert, Loading} from 'ionic-angular';
import {createClass} from "asteroid";
import {UserListPage} from "../userList/userList";


@Page({
  templateUrl: 'build/pages/userJoin/userJoin.html'
})
export class UserJoinPage {
  static get parameters(){
    // return [[NavController], [NavParams]];
    return [[NavController]];
  }

  constructor(nav){
    this.nav = nav;
    this.local = new Storage(LocalStorage);
    this.loading = Loading.create({
      content: 'Loading...'
    });
    this.userInfo = {
      name: '김세영',
      email: 'shirong.jin@outlook.com'
    };
    this.local.get('LoginUserInfo').then((result)=>{
      this.userInfo = JSON.parse(result);
    });
    this.contentList = [
      this.userInfo.name + '님~! 반가워요.<br>테이스트에게 당신에 대해 알려주세요.',
      this.userInfo.name + '님의 성별을 선택해주세요.' 
    ];
    this.step1 = true;
    this.step2 = false;
    
    this.foodCategory = [
      '라면', '김치찌개', '햄버거', '파스타', '곱창볶음', '떡볶이', '순대볶음', '감자튀김', '피자', '프라이드치킨',
      '양념치킨', '삼겹살', '갈비', '스시', '짬뽕'
    ];
  
    this.selectedCategory = [];
    
    const Asteroid = createClass();
    // Connect to a Meteor backend
    this.asteroid = new Asteroid({
        endpoint: "ws://localhost:3000/websocket"
    });
  }

  clickGender(gender) {
    this.contentList.push(gender==='M' ? '남자' : '여자');
    this.userInfo.gender = gender;
    this.step1 = false;
    this.step2 = true;
    console.log(this.userInfo);
  }

  onClickFoodCategory(food) {
    this.selectedCategory.push(food);
  }
  
  onClickSubmit() {
    this.userInfo.selectedCategory = this.selectedCategory;
    this.asteroid.call('join', this.userInfo)
      .then(result => {
        console.log('after join success', result);
        // list페이지로 이동 한다.
        // this.nav.push(UserListPage, {
        //   userId : 'dlksjflksdjl'
        // });

        let alert = Alert.create({
          title: '축하합니다',
          subTitle: '테이스티 회원가입이 완료되었습니다.',
          buttons: ['확인']
        });
        this.nav.present(alert);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
}
