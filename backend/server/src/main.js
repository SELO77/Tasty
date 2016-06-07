import {Meteor} from 'meteor/meteor';
import {cc} from './lib/common_utils'
import {join} from './service/user/join';
import {login} from './service/user/login';
import {auto_recommend} from './service/store/recommend';


Meteor.methods({
    "join": function (user) {
        return join(user);
    },
    "login": function (user) {
        return login(user);
    },
    "auto_recommend": function (user) {
        return auto_recommend(user)
    }
    // "search": function(category) {
    //   return search
    // }
});
