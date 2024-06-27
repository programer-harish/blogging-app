import { apiCaller } from "./helper";

export const signUp=(user)=>{

    return apiCaller.post("auth/register",user).then((response)=>response.data)
}

export const login=(user)=>{

    return apiCaller.post("auth/login",user).then((response)=>response.data)
}