import {Meteor} from 'meteor/meteor'

user = {
  "email": "selo77@naver.com",
  "user_name": "이새로찬",
  "category": ["일식", "일식당", "중식", "중식당"]
};

Test = {
  login: function () {
    console.log("login");

    if (user) {
      console.log("==user", user);
      Meteor.call('login', user, function (error, result) {
        console.log("====== client login");
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    }
  },
  join: function () {
    console.log("join");
  },
  auto_recommend: function() {
    console.log("auto_recommend");
    Meteor.call('auto_recommend', user, function (error, result){
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }
};

// [
// '중식',                  
// '한식',          
// '육류,고기요리', 
// '음식점',        
// '치킨,닭강정',   
// '족발,보쌈',     
// '피자',          
// '분식',          
// '떡볶이',        
// '닭갈비',        
// '돼지고기구이',  
// '카페,디저트',   
// '베이커리',      
// '인도음식',      
// '양식',          
// '일식',          
// '일식당',        
// '종합분식',      
// '이탈리아음식',  
// '스파게티,파스타전문',
// '생선회',        
// '양꼬치',        
// '햄버거',        
// '죽',            
// '초밥,롤',       
// '아귀찜,해물찜', 
// '매운탕,해물탕', 
// '스테이크,립',   
// '패밀리레스토랑',
// '카페',          
// '감자탕'
// ] 
