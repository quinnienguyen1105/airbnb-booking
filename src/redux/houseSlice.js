import { createSlice} from '@reduxjs/toolkit';


export const houseSlice = createSlice ({
    name: 'house',
    initialState: {
        house: []
    },

    reducers: {
        addHouse: (state, action) => {
            state.house.push(action.payload);
        },
        showHouses: (state, action) => {
            state.house = action.payload;

        }
    }
});
export const {addHouse, showHouses} = houseSlice.actions;
export default houseSlice.reducer;