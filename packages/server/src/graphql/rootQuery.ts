import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {Message} from "../message/model";
import {listMessages} from "../message/resolvers";
import {createMessage} from "../message/mutations/createMessageMutation";
import {createUser} from "../user/mutations/createUser";
import {createSession} from "../session/mutations/createSession";
import {User} from "../user/model";
import {getUserById} from "../user/resolvers";
import {authGuard} from "../session/authGuard";

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
      messages: {
        type: new GraphQLList(Message),
        async resolve(parent, args, context) {
          return (await authGuard(listMessages, context))(context)
        }
      },
      user: {
        type: User,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(parent, { id } , context) {
          return (await authGuard(getUserById, context))(context, id)
        }
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RooMutation',
    fields: {
      createMessage,
      createUser,
      createSession,
    }
  })
})
