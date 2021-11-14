import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {User} from "../user/model";

export const Session = new GraphQLObjectType({
  name: 'SessionQuery',
  fields: {
    token: {
      type: GraphQLString,
      resolve(parent) {
        return parent?.token
      }
    },
    user: {
      type: GraphQLNonNull(User),
      resolve(parent) {
        return parent?.user
      }
    }
  }
})
