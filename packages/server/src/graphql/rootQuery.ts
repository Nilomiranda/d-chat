import { GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {createMessage} from "../message/mutations/createMessageMutation";
import {createUser} from "../user/mutations/createUser";
import {createSession} from "../session/mutations/createSession";
import {messageCreated} from "../message/subscriptions/messageCreated";
import { userQuery } from "../user/queries/user";
import { messagesQuery } from "../message/queries/message";
import { sessionQuery } from "../session/queries/session";

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
      session: sessionQuery
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
      messageCreated,
    }
  })
})
