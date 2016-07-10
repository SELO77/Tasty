import {Meteor} from 'meteor/meteor';
import {cc} from './lib/commonUtils'
import {userJoin} from './service/user/userJoin';
import {userLogin} from './service/user/userLogin';
import {userUpdate} from './service/user/userUpdate';
import {auto_recommend} from './service/store/recommend';



Meteor.methods({
    "userJoin": function (user) {
        cc(user.name, "okblue");
        return userJoin(user);
    },
    "userLogin": function (user) {
        cc(user.name, "okblue");
        return userLogin(user);
    },
    "userUpdate": function (user) {
        cc(user.name, "okblue");
        return userUpdate(user);
    },
    "auto_recommend": function (user) {
        cc(auto_recommend.name, "okblue");
        return auto_recommend(user)
    }
    // "search": function(category) {
    //   return search
    // }
});