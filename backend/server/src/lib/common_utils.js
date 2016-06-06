// class common_utils{
    
// }
export function cc(content, type){
    content = String(content)
    
    let HEADER = '\033[95m'
    let OKBLUE = '\033[94m'
    let OKGREEN = '\033[92m'
    let WARNING = '\033[93m'
    let FAIL = '\033[91m'
    let END = '\033[0m'
    let BOLD = '\033[1m'
    let UNDERLINE = '\033[4m'
     
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
