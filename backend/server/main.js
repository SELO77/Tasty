import { Meteor } from 'meteor/meteor';
var req_count = 0;
console.log("\033[91m!!!!count:",req_count);
Meteor.startup(() => {
  // code to run on server at startup
  console.log('==laceri server start==')
  console.log('==version:', Meteor.release)
  console.log('\033[092m===========================\033[0m')
  
  
  Meteor.methods({
    "getMyList": function (userData) {
      req_count += 1
      console.log("======= server getMyList")
      console.log("\033[91m!!!!count:",req_count);
      let result;
      
      // result = Stores.find({
      //   "category" : ["중식", "중식당"]
      // });
      
      result = Stores.find({
        "category" : ["중식", "중식당"]
      });
          
      
      console.log("======= end server getMyList")
      console.log(result.count())
      console.log(result.fetch())
      return result;
    }
  })
  
  // Meteor.publish('stores', function(userData) {
  //   // Stores = new Mongo.Collection('stores')
    
  //   //logic 구현 부분
  //   let result = [];
  //   // let user = userData
  //   // console.log(user.category)
    
  //   // test = Stores.findOne()
  //   // console.log("test:",test)
    
  //   // if (user){
  //   //     console.log("user:",user)
  //   //     // result = Stores.find({"category" : {$in : user.category}});
  //   //     result = Stores.find({"category": ["중식","중식당"]});
  //   //     console.log("==search stores result:\n", result) 
  //   // }
    
  //   result = Stores.find({
  //     "category" : ["중식", "중식당"]
  //   });
    
  //   return result
  // });
  
});

// test