import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: "1",
        title: "cochino",
        description: "yeah, claro",
        completed: false
    },
    {
        id: "2",
        title: "chancho",
        description: "yeah, noo",
        completed: false
    },

]

export const genderSlice = createSlice({
    name: 'genders',
    initialState,
    reducers: {
        addGender: (state, action) => {
            //console.log(state, action)
            state.push(action.payload)
        },
        deleteGender: (state, action) => {
           // console.log(action.payload)
           const genderFound = state.find(gender => gender.id === action.payload)
           //console.log (genderFound)
           if(genderFound) {
            state.splice(state.indexOf(genderFound), 1)
           }
        },
        updateGender:(state, action) => {
            //console.log(action.payload)
            const {id, title, description} = action.payload
            const foundGender = state.find(gender => gender.id === id)
            if(foundGender){
                foundGender.title= title
                foundGender.description= description
            }
        }
    }
})

export const {addGender,deleteGender,updateGender} = genderSlice.actions
export default genderSlice.reducer