/**
 * Created by SELO on 2016. 6. 7..
 */

export function auto_recommend(user) {
  return Stores.find({"category": {$in:user.category}}).fetch();
}