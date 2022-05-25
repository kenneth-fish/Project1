import {createSlice, createAsyncThunk} from  "@reduxjs/toolkit";
import axios from "axios";
import { Reimbursement } from "../Components/Reimbursement/Reimbursement";
import {IReimbursement} from "../Interfaces/IReimbursement";

interface ReimbursementSliceState{
    loading: boolean,
    error: boolean,
    reimbursements?: IReimbursement[]
}

const initialReimbursementState: ReimbursementSliceState = {
    loading: false,
    error: false
};

export const getReimbursements = createAsyncThunk(
  "reimbursements/get",
  async (thunkAPI) => {
      try{
          axios.defaults.withCredentials = true;
          const res = await axios.get("http://localhost:8000/reimbursements/viewall");

          return res.data;
      } catch (e){
          console.log(e);
      }
  }  
);

export const getReimbursementById = createAsyncThunk(
    "reimbursement/get",
    async (id: number | undefined, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get("http://localhost:8000/reimbursements/view/${id}");
  
            return res.data;
        } catch (e){
            console.log(e);
        }
    }  
  );

export const createReimbursement = createAsyncThunk(
    "reimbursements/create",
    async (newReimbursement:IReimbursement, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.post("http://localhost:8000/reimbursement/register", newReimbursement);

            return newReimbursement;
        } catch (e){
            console.log(e);
        }
    }
)

export const updateReimbursement = createAsyncThunk(
    "reimbursements/update",
    async (id: number | string, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.put("http://localhost:8000/reimbursements/update/${id}");

            return res.data;
        } catch (e){
            console.log(e);
        }
    }
)

export const deleteReimbursement = createAsyncThunk(
    "reimbursements/delete",
    async (id: number | string, thunkAPI) => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.delete("http://localhost:8000/reimbursements/delete/${id}");

            return res.data;
        } catch (e){
            console.log(e);
        }
    }
)

export const ReimbursementSlice = createSlice({
    name: 'reimbursements',
    initialState: initialReimbursementState,
    reducers: {
        clearReimbursements: (state) => {
            state.reimbursements = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getReimbursements.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getReimbursements.fulfilled, (state, action) => {
            state.reimbursements = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getReimbursements.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        builder.addCase(createReimbursement.fulfilled, (state, action) => {
            if(state.reimbursements && action.payload){
                state.reimbursements = [action.payload, ...state.reimbursements];
            }
        });
        builder.addCase(updateReimbursement.fulfilled, (state, action) => {
            if(state.reimbursements && action.payload){
                state.reimbursements = [action.payload, ...state.reimbursements];
            }
        });
        builder.addCase(deleteReimbursement.fulfilled, (state, action) => {
            if(state.reimbursements && action.payload){
                state.reimbursements = [action.payload, ...state.reimbursements];
                //const id = state.filer((reimb) => reimb.getReimbursementById === action.payload)
            }
        });
    }
});

export const {clearReimbursements} = ReimbursementSlice.actions;

export default ReimbursementSlice.reducer;