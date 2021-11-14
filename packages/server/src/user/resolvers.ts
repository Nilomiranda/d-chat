import {ApplicationContext} from "../globalInterfaces";

export const getUserById = async (context: ApplicationContext, userId: string) => {
  const { prisma } = context

  return prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}
