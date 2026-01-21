
import prisma from "@repo/database";
import type { user } from "@/Store/store";
import { ProjectError } from "@/Components/messages/Error";

export default async function signup(props: user) :Promise<ProjectError|{
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: boolean;
    image: string | null;
    username: string;
}>{
  const { id, name, email, emailVerified,image,username } = props;
  try {
    const response=await prisma.user.create({
      data: {
        id,
        name,
        email,
        emailVerified,
        image,
        username:username || `name+${Math.random()*100}`
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return new ProjectError({
      name: "SIGNIN_ERROR",
      message: "cannot sign_in",
      cause: error,
    });
  }
}
