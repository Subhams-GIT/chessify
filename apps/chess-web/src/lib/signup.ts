import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import prisma from "@repo/database";
import type { user } from "@/Store/store";
import { ProjectError } from "@/Components/messages/Error";

export default async function signup(props: user) :Promise<any|ProjectError>{
  const { id, name, email, emailVerified } = props;
  try {
    const avatar = createAvatar(lorelei, {
      seed: name,
    });

    const svg = avatar.toString();
    const response=await prisma.user.create({
      data: {
        id,
        name,
        email,
        emailVerified,
        image:svg,
        username:name.split(" ")[1]+Math.random()*100
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
