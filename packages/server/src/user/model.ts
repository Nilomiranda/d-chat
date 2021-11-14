import {GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export const User = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent?.id
      }
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.name
      }
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.email
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
