import { cc } from '../lib/commonUtils';
try {
    Users = new Mongo.Collection('users');
    
    if (Users instanceof Object) {
        cc("Succeed to load Users", 'okgreen');
    }
}catch (e) {
    console.log(e);
}
