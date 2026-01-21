export const runtime = 'nodejs';
import  auth from "@/lib/auth-client";
import { toNextJsHandler } from "better-auth/next-js";


export const { GET, POST } = toNextJsHandler(auth);
