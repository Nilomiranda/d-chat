import { pubsub } from "..";
import {ApplicationContext} from "../globalInterfaces";
import {CreateMessageInput} from "./mutations/createMessageMutation";

export const listMessages = (context: ApplicationContext) => {
  const { prisma } = context
  return prisma?.message?.findMany({
    include: {
      user: true
    }
  })
}

export const createNewMessage = async (context: ApplicationContext, input: CreateMessageInput) => {
  const { prisma, user } = context
  const { content } = input

  const createdMessage = await prisma?.message?.create({
    data: {
      content,
      user: {
        connect: {
          id: user?.id
        }
      }
    }
  })

  Object.assign(createdMessage, {user})

  if (createdMessage) {
    pubsub.publish('MESSAGE_CREATED', {
      messageCreated: createdMessage
    })
  }

  return createdMessage
}
