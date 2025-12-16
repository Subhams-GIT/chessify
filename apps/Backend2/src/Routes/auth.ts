import express,{Request, Response, Router} from "express";
import dotenv from "dotenv";
import passport from "passport";
import prisma from "database";
import jwt from 'jsonwebtoken'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

interface UserDetails {
  id: string;
  token?: string;
  name: string;
}
const router: Router= express.Router();
router.get('/refresh', async (req: Request, res: Response) => {
  if(!JWT_SECRET){
    return null;
  }
  console.log(req.user)
  if (req.user) {
    const user = req.user as UserDetails
    const userDb = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    const token = jwt.sign({ userId: user.id, name: userDb?.name }, JWT_SECRET);
    res.json({
      token,
      id: user.id,
      name: userDb?.name,
    });
  }  else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});
router.get(
  "/google",
  passport.authenticate("google",{
    scope:['profile','email']
  }),
);

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'http://localhost:3000/login'
}));

export default router;
