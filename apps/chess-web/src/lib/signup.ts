import prisma from "@repo/database";
import type { user } from "@/Store/store";
import { ProjectError } from "@/Components/messages/Error";
export default async function signup(props: user) {
  const { id, name, email, emailVerified } = props;
  try {
      await prisma.user.create({
        data: {
          id,
          name,
          email,
          emailVerified,
        },
      });
  } catch (error) {
    console.error(error)
    return new ProjectError({name:"SIGNIN_ERROR",message:'cannot sign_in',cause:error})
  }
}
