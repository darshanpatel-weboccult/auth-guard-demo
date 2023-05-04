import { createReducer, on } from "@ngrx/store";
import { userActions } from "./user.action";

export interface User{
    name: string;
    role: string;
}



const initUser:User = {
    name:'',
    role:''
} 


export const userReducer = createReducer(initUser, on(userActions.updateUser, (state, payload) => {
    const {type:_, ...userInfo} = payload;
    return ({...state, ...userInfo}); 
}))