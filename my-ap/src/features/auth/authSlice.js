import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const user = JSON.parse(localStorage.getItem('user'))

const  initialState ={
    user: user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI)=>{
    try {
        const res = await axios.post('http://localhost:5000/register', user )
         localStorage.setItem('token', 'token')
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue((error.response.data))
    }
})

// const authSlice = createSlice({
//     name:'auth',
//     initialState,
//     reducers:{
//         reset:(state)=>{
//             state.isLoading=false
//             state.isError=false
//             state.isSuccess=false
//             state.message=''
//         }
//     },
//     extraReducers:(builder)=>{
//         builder
//         .addCase(registerUser.pending, state=>{
//             state.isLoading= true
//             state.isSuccess= false
//             state.isError=false

//         })
//         .addCase(registerUser.fulfilled, (state,action)=>{
//             state.isLoading= false
//             state.isSuccess= true
//             state.isError=false
//             state.user= action.payload
//             state.message=action.payload.message

//         })
//         .addCase(registerUser.rejected, (state,action)=>{
//             state.isLoading= false
//             state.isSuccess= false
//             state.isError= true
//             state.message=action.payload.message
//             state.user= null
//         })
//     }
// })


// // console.log(store.getState());

// export const {reset} = authSlice.actions
// export default authSlice.reducer



















export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:5000/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
        state.user = null;
      },
      logout: (state) => {
        state.user = null;
        state.isSuccess = false;
        localStorage.removeItem('token');

      
        window.location.replace('/login');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.user = action.payload;
          state.message = action.payload.message;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload.message;
          state.user = null;
        })
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = false;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.user = null;
          state.message = action.payload.message;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload.message;
        });
    },
  });
  

export const {reset, logout} = authSlice.actions
export default authSlice.reducer
