import { GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {createMessage} from "../message/mutations/createMessageMutation";
import {createUser} from "../user/mutations/createUser";
import {createSession} from "../session/mutations/createSession";
import {messages} from "../message/subscriptions/messages";
import { userQuery } from "../user/queries/user";
import { messagesQuery } from "../message/queries/message";

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      test: {
        type: GraphQLString,
        resolve(){
          return 'API Online!'
        }
      },
      messages: messagesQuery,
      user: userQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RooMutation',
    fields: {
      createMessage,
      createUser,
      createSession,
    }
  }),
  subscription: new GraphQLObjectType({
    name: 'RootSubscription',
    fields: {
      messages,
    }
  })
})
