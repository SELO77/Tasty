import {Meteor} from 'meteor/meteor'
console.log("==users.js==");
Users = new Mongo.Collection('users');

Meteor.publish('users', function(user) {
    console.log("!!!!")
    console.log("user:",user)
    user = Users.findOne({"email": user.email})
    return user 
});