import { createAvatar } from "@dicebear/core";
import { betterAuth } from "better-auth";
import { lorelei } from "@dicebear/collection";
import signup from "./signup";
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
        before: async (user) => {
          user.image = generateAvatar();
          await signup(user);
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
});

function generateAvatar() {
  const avatar = createAvatar(lorelei).toString();
  return avatar;
}
export type Session = typeof auth.$Infer.Session;
export default auth;
