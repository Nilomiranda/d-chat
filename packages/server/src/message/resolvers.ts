import {ApplicationContext} from "../globalInterfaces";
import {CreateMessageInput} from "./mutations/createMessageMutation";
import {PubSub} from "graphql-subscriptions";

export const listMessages = (context: ApplicationContext) => {
  const { prisma } = context
  return prisma?.message?.findMany({
    include: {
      user: true
    }
  })
}

export const createNewMessage = async (context: ApplicationContext, input: CreateMessageInput) => {
  const pubsub = new PubSub();

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
      createMessage: createdMessage
    }).then(res => {
      console.log('published', res)
    })
  }

  return createdMessage
}
