/**
 * Created by SELO on 2016. 6. 6..
 */

import {Meteor} from 'meteor/meteor';
import {cc} from '../../lib/common_utils.js';

export function userJoin(user) {
  let result;
  try {
    db_result = Users.insert(user);
    cc("db_result", db_result);
  }
  catch (e) {
    cc(e, 'fail');
  }
        
  return result
}
