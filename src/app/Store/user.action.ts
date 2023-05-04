import { createActionGroup, props } from "@ngrx/store";


export const userActions = createActionGroup({
    source:'User',
    events:{
        'Update User': props<{name?:string, role?:string}>()
    }
})