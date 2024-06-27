import { apiCaller } from "./helper";

export const loadAllCategories =()=>{
    return apiCaller.get('category/getAllCategory').then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(JSON.stringify(error))
        }
    )
}
