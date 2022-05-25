import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import {IUser} from "../Interfaces/IUser";
import {AppDispatch} from "../Store"

//Figure out our default state for this slice
const dispatch:AppDispatch = useDispatch();

interface UserSliceState {
    loading: boolean,
    error: boolean,
    user?: IUser
}

const initialUserState: UserSliceState = {
    user: {
        userId: 0,
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 0
    },
    loading: false,
    error: false
}

type Login = {
    username: string,
    password: string
}

export const loginUser = createAsyncThunk(
    'users/login',
    async (credentials:Login, thunkAPI) => {
        try{
            const res = await axios.post('http://localhost:8000/users/login', credentials);

            return {
                userId: res.data.userId,
                userName: res.data.username,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                role: res.data.role
            }
        } catch(e){
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'users/get',
    async (id: number | undefined, thunkAPI) => {
        try{
            const res = await axios.get(`http://localhost:8000/users/view/${id}`);

            return {
                userId: res.data.userId,
                userName: res.data.username,
                password: res.data.password,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                role: res.data.role
            }
        } catch(error){
            console.log(error);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = axios.get("http://localhost:8000/users/logout");
        } catch(e){
            console.log(e);
        }
    }
)

//Create the slice
export const UserSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        toggleError : (state) => {
            state.error = !state.error;
        }
    },
    extraReducers: (builder) => {
        //This is where we would create our reducer logic
        builder.addCase(loginUser.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload; //payload - the return from the above asyncThunk
            state.error = false;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(getUserDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading =false;
            state.user = action.payload;
        });
        builder.addCase(getUserDetails.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(logout.fulfilled, (state, action)=> {
            state.user = undefined;
        })
    }
})

//export normal actions and reducers
export const {toggleError} = UserSlice.actions;

export default UserSlice.reducer;