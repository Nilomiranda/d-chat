import {User} from "../model";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as bcrypt from 'bcrypt'
import {ApplicationContext} from "../../globalInterfaces";

export const createUser = {
  type: User,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(parent, args, context: ApplicationContext) {
    const { name, email, password } = args
    const { prisma } = context

    const hashedPassword = await hashPassword(password)

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12)
}
