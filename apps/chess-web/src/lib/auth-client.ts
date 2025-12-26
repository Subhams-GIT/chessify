import prisma from '@repo/database'
import {betterAuth} from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
const auth=betterAuth({
    database:prismaAdapter(prisma,{provider:'mongodb'}),
    socialProviders:{
        google:{
            clientId:process.env.CLIENT_ID!,
            clientSecret:process.env.CLIENT_SECRET!,
        }
    },
    advanced:{
        useSecureCookies:true
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 30 * 60 *24 * 60,
            strategy: "compact" 
        }
    },
    secret:process.env.BETTER_AUTH_SECRET!,
    baseURL:process.env.BETTERAUTH_URL!
}) 
export type Session=typeof auth.$Infer.Session
export default auth
