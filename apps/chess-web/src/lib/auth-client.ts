import { createAvatar } from "@dicebear/core";
import { betterAuth } from "better-auth";
import { lorelei } from "@dicebear/collection";
import prisma from "@repo/database";
import type { User } from "better-auth";
import { customSession } from "better-auth/plugins";
const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    },
  },
  advanced: {
    useSecureCookies: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user: User) => {
          await prisma.user.upsert({
            where: { id: user.id },
            update: {}, 
            create: {
              id: user.id,
              emailVerified: user.emailVerified,
              name: user.name,
              username: (user.name?.split(" ")[0] ?? "user") + Math.floor(Math.random() * 1000),
              image: createAvatar(lorelei).toDataUri(),
            },
          });
        },
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 30 * 60 * 24 * 60,
      strategy: "compact",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTERAUTH_URL!,
  plugins:[
    customSession(async ({user,session})=>{
      const dbuser=await prisma.user.findFirst({where:{id:user.id}})
      return {
        user:{
          ...user,
          username:dbuser?.username
        },
        session:{
          ...session,
          username:dbuser?.username
        }
      }
    })
  ]
});



export type Session = typeof auth.$Infer.Session;
export default auth;
