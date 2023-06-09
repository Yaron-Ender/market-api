
import { createContext, useReducer,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
export const AuthContex = createContext();

export const authReducer = (state,action)=>{
switch (action.type) {
case "LOGIN":
return { ...state, user: action.payload };
case "LOGOUT":
return { ...state, user: null };
case "AUTH_IS_READY":
return { ...state, authIsReady: true, user: action.payload };
default:
return state;
}
}

export const AuthContextProvider = ({children})=>{
const [state,dispatch]=useReducer(authReducer,{
user:null,
authIsReady:false
})
useEffect(() => {
const unsub = onAuthStateChanged(auth, (user) => {
  dispatch({ type: "AUTH_IS_READY", payload: user });
  //cleanup function
  unsub();
});
}, []);
return (
  <AuthContex.Provider value={{ ...state, dispatch }}>
    {children}
  </AuthContex.Provider>
);
}