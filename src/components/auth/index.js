const SESSION_USER ='session_user'

export const isLoggedIn=()=>{
    let data = localStorage.getItem(SESSION_USER);
    if (data != null) {
        return true;
    } else {
       return false;
    }
}

export const doLogin=(data,next)=>{
    localStorage.setItem(SESSION_USER,JSON.stringify(data))
    //below storing keycloak access token
    // localStorage.setItem(SESSION_USER,data)
    next()
}

export const doLogout=(next)=>{
    localStorage.removeItem(SESSION_USER)
    next()
}

export const getCurrentUserDetail=()=>{
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem(SESSION_USER)).user
    } else {
        return undefined;
    }
}

export const getToken=()=>{
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem(SESSION_USER)).token
    } else {
        return null;
    }
}