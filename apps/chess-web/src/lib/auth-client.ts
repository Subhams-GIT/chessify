import {betterAuth} from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from 'database'
export const auth=betterAuth({
    database:prismaAdapter(prisma,{
        provider:'mongodb'
    }),
    socialProviders:{
        google:{
            clientId:process.env.CLIENT_ID??"",
            clientSecret:process.env.CLIENT_SECRET??"",
        }
    }
})
