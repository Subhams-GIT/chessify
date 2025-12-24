
import {betterAuth} from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
const auth=betterAuth({
    socialProviders:{
        google:{
            clientId:process.env.CLIENT_ID!,
            clientSecret:process.env.CLIENT_SECRET!,
        }
    },
    secret:process.env.BETTER_AUTH_SECRET!,
    baseURL:process.env.BETTERAUTH_URL!
}) 
export default auth