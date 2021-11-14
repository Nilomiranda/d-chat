import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken'
import {ApplicationContext} from "../globalInterfaces";

interface DecodedJWTToken {
  userId: string
  iat: number
  exp: number
}

export const authGuard = async (guardedFunction: (...params) => void | Promise<any>, context: ApplicationContext) => {
  const { user } = context

  if (!user) {
    throw new Error('Authenticate first')
  }

  return guardedFunction
}

export const decodeTokenAndGetUser = async (context: ApplicationContext): Promise<User | null> => {
  const { prisma } = context
  const token = context.cookies.get('token')

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as DecodedJWTToken

    if (!decoded || !decoded.userId) {
      return null
    }

    return prisma.user.findUnique({
      where: {
        id: decoded.userId
      }
    })
  } catch {
    return null
  }
}
