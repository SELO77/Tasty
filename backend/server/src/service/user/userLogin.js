/**
 * Created by SELO on 2016. 6. 5..
 */

import {Meteor} from 'meteor/meteor';
import {cc} from '../../lib/commonUtils.js';


export function userLogin(user) {
    login_user = Users.findOne({"email": user.email});
    if (login_user) {
        result = login_user;
    } else {
        result = "로그인 실패";
    }
    return result
}