/**
 * Created by SELO on 2016. 6. 6..
 */

import {Meteor} from 'meteor/meteor';
import {cc} from '../../lib/commonUtils.js';

export function userJoin(user) {
  try {
    db_result = Users.insert(user);
    cc("db_result:", db_result);
  }
  catch (e) {
    cc(e, 'fail');
  }
        
  return result
}