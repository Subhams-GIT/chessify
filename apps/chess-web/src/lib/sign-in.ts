import { authClient } from "./auth-client";

await authClient.signIn.social({
    provider:"google",
    /** 
    @default "/dashboard"
    
    */
   callbackURL:"/dashboard",
   errorCallbackURL:"/",
   newUserCallbackURL:"/dashboard"
})