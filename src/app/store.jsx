import { configureStore } from "@reduxjs/toolkit";

import gendersReducer from "../features/genders/genderSlice";
//import userSliceReducer from "../features/users/userSlice";

//import { UserInfo } from "../models/user.model";

/*export const AppStore = {
    user: UserInfo,
}
*/

export const store = configureStore({
    reducer:{
        genders: gendersReducer,
       // user: userSliceReducer,
    },
});