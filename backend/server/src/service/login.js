import { Meteor } from 'meteor/meteor';
import { cc } from '../lib/common_utils.js';


export function login(user){
    console.log("login.js login()");
    login_user = Users.findOne({"email":user.email});
        if(login_user){
            rs = login_user;   
        } else {
            rs = "로그인 실패";
        }
        return rs
}



// Meteor.methods({
//     "login": function(user) {
//         console.log("==login on server");
//         console.log("==user:",user);
//         let rs;
        
//         login_user = Users.findOne({"email":user.email});
//         if(login_user){
//             rs = login_user;
            
//         } else {
//             rs = "로그인 실패";
//         }
        
//         return rs
//     }
// })