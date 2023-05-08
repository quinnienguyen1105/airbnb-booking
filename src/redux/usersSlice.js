import { createSlice} from '@reduxjs/toolkit';


export const usersSlice = createSlice ({
    name: 'users',
    initialState: {
        users: []
    },

    reducers: {
        addUser: (state, action) => {
            //const { firstName, lastName, email, password, userType } = action.payload;
            state.users.push(action.payload);
        },
    }
});
export const {addUser} = usersSlice.actions;
export default usersSlice.reducer;