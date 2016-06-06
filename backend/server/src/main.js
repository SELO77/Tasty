import {
  Meteor
} from 'meteor/meteor';
import {
  login
} from './service/login.js';
var req_count = 0;
console.log("\033[91m!!!!count:", req_count);
Meteor.startup(() => {
  // code to run on server at startup
  console.log('==laceri server start==')
  console.log('==version:', Meteor.release)
  console.log('\033[092m===========================\033[0m')

});

Meteor.methods({
  "login": function(user) {
    console.log(login(user));
    return login(user);
  }
  // "search": function(category) {
  //   return search
  // }
});