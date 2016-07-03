import {Meteor} from 'meteor/meteor'

user = {
  "email": "selo77@naver.com",
  "user_name": "이새로찬",
  "category": ["일식", "일식당", "중식", "중식당"]
};

Test = {
  login: function () {
    console.log("userLogin");

    if (user) {
      console.log("==user", user);
      Meteor.call('userLogin', user, function (error, result) {
        console.log("====== client userLogin");
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    }
  },
  join: function () {
    console.log("userJoin");
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