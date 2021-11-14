import {GraphQLNonNull, GraphQLString} from "graphql";
import {Message} from "../model";
import {ApplicationContext} from "../../globalInterfaces";
import {authGuard} from "../../session/authGuard";
import {createNewMessage} from "../resolvers";

export interface CreateMessageInput {
  content: string
}

export const createMessage = {
  type: Message,
  args: {
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(parent, args: CreateMessageInput, context: ApplicationContext) {
    return (await authGuard(createNewMessage, context))(context, args)
  }
}
