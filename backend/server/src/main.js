import {Meteor} from 'meteor/meteor';
import {cc} from './lib/common_utils'
import {join} from './service/user/join';
import {login} from './service/user/login';


Meteor.methods({
    "join": function (user) {
        return join(user);
    },
    "login": function (user) {
        return login(user);
    }
    // "search": function(category) {
    //   return search
    // }
});
