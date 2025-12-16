import express, { Request, Response } from "express";
import session from "express-session";

import cors from "cors";
import login from "./Routes/auth";
import passport from "passport";
import initPassport from "./passport";
import helmet from 'helmet';
import prisma from "database";
const app = express();
app.use(cors(
  
));
app.use(session({
  secret:process.env.CLIENT_SECRET as string,
  resave:false,
  saveUninitialized:false,
}))
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      connectSrc: ["'self'", "http://localhost:3000"],
    },
  })
);
async function testDb() {
  try {
    await prisma.$connect();
    console.log('Prisma connected!');
  } catch (err) {
    console.error('Prisma connection failed:', err);
    process.exit(1);
  }
}
testDb();
app.use(passport.authenticate('session'))
initPassport();
app.use("/auth", login);
app.listen(4000,()=>{
  console.log('listening at port 3000')
})
