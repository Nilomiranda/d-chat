import {Session} from "../model";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import {ApplicationContext} from "../../globalInterfaces";

interface CreateSessionArgs {
  email: string;
  password: string;
}

export const createSession = {
  type: Session,
  args: {
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  async resolve(parent, args: CreateSessionArgs, context: ApplicationContext) {
    const { email, password } = args
    const { prisma, cookies } = context

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user || !(await validatePassword(user?.password, password))) {
      throw new Error('Wrong credentials.')
    }

    const token = jwt.sign({
      userId: user?.id
    }, process.env.JWT_SECRET, { expiresIn: '1 week' })

    cookies.set('token', token, { secure: process.env.NODE === 'production', httpOnly: true, path: '/', sameSite: process.env.NODE === 'production' ? "none" : "lax" })

    return {
      user,
      token
    }
  }
}

const validatePassword = (userPassword: string, givenPassword: string) => {
  return bcrypt.compare(givenPassword, userPassword)
}
