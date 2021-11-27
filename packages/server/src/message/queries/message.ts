import { GraphQLFieldConfig, GraphQLList } from "graphql"
import { authGuard } from "../../session/authGuard"
import { Message } from "../model"
import { listMessages } from "../resolvers"

export const messagesQuery: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(Message),
  async resolve(parent, args, context) {
    return (await authGuard(listMessages, context))(context)
  }
}
