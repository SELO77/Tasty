import { cc } from '../lib/common_utils';

try {
    Stores = new Mongo.Collection('stores');

    if (Stores instanceof Object){
        cc("Succeed to load Stores", 'okgreen');
    }

} catch(e) {
    cc(e,'fail');
}



