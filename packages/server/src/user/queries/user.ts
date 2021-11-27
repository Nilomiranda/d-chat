import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import { authGuard } from "../../session/authGuard";
import { User } from "../model";
import { getUserById } from "../resolvers";

export const userQuery: GraphQLFieldConfig<any, any> = {
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
