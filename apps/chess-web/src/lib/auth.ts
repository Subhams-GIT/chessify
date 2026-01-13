import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import auth from "./auth-client";

export const authClient  = createAuthClient({
    baseURL:'http://localhost:3000',
    plugins:[customSessionClient<typeof auth>()]
})

export type Session = typeof authClient.$Infer.Session
export type User=typeof authClient.$Infer.Session.user