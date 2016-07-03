import {Page, NavController} from 'ionic-angular';
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
    // this.navParams = navParams;
    this.gender = "F";
    
    this.foodCategory = [
      '중식',                  
      '한식',          
      '육류,고기요리', 
      '음식점',        
      '치킨,닭강정',   
      '족발,보쌈',     
      '피자',          
      '분식',          
      '떡볶이',        
      '닭갈비',        
      '돼지고기구이',  
      '카페,디저트',   
      '베이커리',      
      '인도음식',      
      '양식',          
      '일식',          
      '일식당',        
      '종합분식',      
      '이탈리아음식',  
      '스파게티,파스타전문',
      '생선회',        
      '양꼬치',        
      '햄버거',        
      '죽',            
      '초밥,롤',       
      '아귀찜,해물찜', 
      '매운탕,해물탕', 
      '스테이크,립',   
      '패밀리레스토랑',
      '카페',          
      '감자탕'
    ];
  
    this.selectedCategory = [];
    
    const Asteroid = createClass();
    // Connect to a Meteor backend
    this.asteroid = new Asteroid({
        endpoint: "ws://localhost:3000/websocket"
    });
  }

  onClickFoodCategory(food) {
    this.selectedCategory.push(food);
  }
  
  onClickSubmit() {
    this.asteroid.call('userJoin', this.selectedCategory)
      .then(result => {
        console.log('after userJoin success', result);
        // list페이지로 이동 한다.
        // this.nav.push(UserListPage, {
        //   userId : 'dlksjflksdjl'
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
}
