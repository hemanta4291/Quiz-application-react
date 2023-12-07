// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../config/firebase';

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
});

export const signInWithEmailPassword = createAsyncThunk(
  'auth/signInWithEmailPassword',
  async ({ email, password },{rejectWithValue}) => {
    try{
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    }catch(error){
      console.error('Error signing in with email and password:', error.message);
      return rejectWithValue(error.message)
    }
  });

export const createUserWithEmailPassword = createAsyncThunk(
'auth/createInWithEmailPassword',
  async ({ email, password },{rejectWithValue}) => {
    
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    }catch(error){
      console.error('Error sign up in with email and password:', error.message);
      return rejectWithValue(error)
    }

  });

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await auth.signOut();
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload
      state.isLoading = false

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          displayName: action.payload.displayName,
          email: action.payload.email,
          uid: action.payload.uid,
          photoURL: action.payload.photoURL
        }
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInWithEmailPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithEmailPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          displayName: action.payload.displayName,
          email: action.payload.email,
          uid: action.payload.uid,
          photoURL: action.payload.photoURL
        }
      })
      .addCase(signInWithEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUserWithEmailPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(createUserWithEmailPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          displayName: action.payload.displayName,
          email: action.payload.email,
          uid: action.payload.uid,
          photoURL: action.payload.photoURL
        }
      })
      .addCase(createUserWithEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error)
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer;
