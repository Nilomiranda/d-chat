import {GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {User} from "../user/model";

export const Message = new GraphQLObjectType({
  name: 'MessagesQuery',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent?.id
      }
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.content
      }
    },
    user: {
      type: User,
      resolve(parent) {
        return parent?.user
      }
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve(parent) {
        return parent?.createdAt
      }
    }
  }
})
