import { GraphQLFieldConfig } from "graphql";
import { ApplicationContext } from "../../globalInterfaces";
import { authGuard } from "../../session/authGuard";
import { User } from "../../user/model";

export const sessionQuery: GraphQLFieldConfig<any, any> = {
  type: User,
  async resolve(root, args, context: ApplicationContext) {
    return (await authGuard(() => context.user, context))()
  }
}
