// class common_utils{
    
// }
function cc(content, type){
    var content = String(content)
    var type = type
    
    var HEADER = '\033[95m'
    var OKBLUE = '\033[94m'
    var OKGREEN = '\033[92m'
    var WARNING = '\033[93m'
    var FAIL = '\033[91m'
    var END = '\033[0m'
    var BOLD = '\033[1m'
    var UNDERLINE = '\033[4m'
     
    if(type == "warning"){
        console.log(WARNING+content+END)
    }else if(type =="header"){
        console.log(HEADER+content+END)
    }else if(type =="okgreen"){
        console.log(OKGREEN+content+END)
    }else if(type =="okblue"){
        console.log(OKBLUE+content+END)
    }else if(type =="fail"){
        console.log(FAIL+content+END)
    }else if(type =="header"){
        console.log(UNDERLINE+content+END)
    }else if(type == undefined){
        console.log(content)
    }
}
