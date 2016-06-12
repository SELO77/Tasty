import {Meteor} from 'meteor/meteor';
import {cc} from './lib/common_utils'
import {join} from './service/user/join';
import {login} from './service/user/login';
import {auto_recommend} from './service/store/recommend';


Meteor.methods({
    "join": function (user) {
        cc(join.name, "okblue");
        return join(user);
    },
    "login": function (user) {
        cc(login.name, "okblue");
        return login(user);
    },
    "auto_recommend": function (user) {
        cc(auto_recommend.name, "okblue");
        return auto_recommend(user)
    }
    // "search": function(category) {
    //   return search
    // }
});