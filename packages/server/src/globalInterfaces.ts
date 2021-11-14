import type {Prisma, PrismaClient, User } from '@prisma/client'
import {ParameterizedContext} from "koa";
import Router from "koa-router";

export interface ApplicationContext extends ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any> {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>
  user?: User | null
}
