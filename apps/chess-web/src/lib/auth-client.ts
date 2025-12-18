import "server-only"
import {betterAuth} from 'better-auth'
import prisma from 'database'
export const auth=betterAuth({
    database:prisma,
    socialProviders:{
        google:{
            clientId:process.env.CLIENT_ID??"",
            clientSecret:process.env.CLIENT_SECRET??"",
        }
    }
})
