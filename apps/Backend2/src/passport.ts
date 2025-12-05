import googleStrategy from "passport-google-oauth20";
import prisma from "database";
import passport from "passport";
import { isTryStatement } from "typescript";
const GoogleStrategy = googleStrategy.Strategy;
export default async function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "openid", "email"],
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void,
      ) {
        try{
        console.log(profile)
        const user = await prisma.user.upsert({
          create: {
            email: profile.emails[0].value,
            name: profile.displayName,
          },
          update: {
            name: profile.displayName,
          },
          where: {
            email: profile.emails[0].value,
          },
        });
        done(null, user);
        }catch(e){
          return done(e, null);
        }
      },
    ),
  );
  passport.serializeUser((user:any, done) => done(null, user.id));
  passport.deserializeUser(async (id:string, done) => {
    try{
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);

    }catch(e){
      console.error(e)
    }
  })
}
