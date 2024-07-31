import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";

// Sign In

interface SignIn {
  username: string;
  password: string;
}

interface SignInState {
  loading: boolean;
  payload: SignIn | null;
  error: any;
}

const initialSignInState: SignInState = {
  loading: false,
  payload: null,
  error: [],
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ requestBody }: { requestBody: any }) => {
    const response = await axios.post<any>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,
      requestBody
    );
    return response.data;
  }
);

export const signInSlice = createSlice({
  name: "signInSlice",
  initialState: initialSignInState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Sign Up

interface SignUp {
  username: string;
  password: string;
  name: string;
}

interface SignUpState {
  loading: boolean;
  payload: SignUp | null;
  error: any;
}

const initialSignUpState: SignUpState = {
  loading: false,
  payload: null,
  error: [],
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ requestBody }: { requestBody: any }) => {
    const response = await axios.post<any>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
      requestBody
    );
    return response.data;
  }
);

export const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: initialSignUpState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Get User Data

interface UserData {
  loading: boolean;
  userData: any | null;
  error: any;
}

const initialUserData: UserData = {
  loading: false,
  userData: null,
  error: [],
};

interface FetchUserArgs {
  authToken: string;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (args: FetchUserArgs) => {
    const { authToken } = args;
    const response = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getUser`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchUserSlice = createSlice({
  name: "userData",
  initialState: initialUserData,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default combineReducers({
  signInSlice: signInSlice.reducer,
  signUpSlice: signUpSlice.reducer,
  fetchUserSlice: fetchUserSlice.reducer,
});
