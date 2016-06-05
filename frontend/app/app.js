import {App, Platform, Page, NavController} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
// import {TabsPage} from './pages/tabs/tabs';

import {createClass} from "asteroid";
import {List} from "./list";


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/

})
export class MyApp {
  // gender: string = "F";
  
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform, nav) {
    this.nav = nav;
    
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

    // this.rootPage = TabsPage;

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   // StatusBar.styleDefault();
    // });
    
    this.stores = [];
  }
  
  onClickFoodCategory(food) {
    this.selectedCategory.push(food);
  }
  
  onClickSubmit() {
    this.asteroid.call('createUser', this.selectedCategory)
      .then(result => {
        // list페이지로 이동 한다.
        // this.nav.setPages([{ page: List }]);
        
        
        this.asteroid.call('getMyList', this.selectedCategory)
          .then(result => {
            this.stores = result.list;
          })
          .catch(error => {
            console.log(error);
          });
        
        
      })
      .catch(error => {
        console.log(error);
      });
  }
}
