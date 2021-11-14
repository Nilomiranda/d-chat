import Koa from 'koa'
import dotenv from 'dotenv'
import bodyParser from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as http from "http";
import {rootSchema} from "./graphql/rootQuery";
import {decodeTokenAndGetUser} from "./session/authGuard";

const prisma = new PrismaClient()

async function startApolloServer() {
  dotenv.config()

  prisma?.$connect().then(() => {
    console.log("🥳 Successfully connected to prisma client")
  }).catch(err => {
    console.error("🔴 Error trying to connect to prisma client", err)
  })

  const app = new Koa();

  const httpServer = http.createServer();
  const server = new ApolloServer({
    schema: rootSchema,
    context: async ({ ctx }) => {
      Object.assign(ctx, { prisma })
      const loggedUser = await decodeTokenAndGetUser(ctx)
      Object.assign(ctx, { user: loggedUser })
      return ctx
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(bodyParser())

  server.applyMiddleware({
    app,
    cors: {
      origin: (ctx) => {
        const validDomains = ['http://localhost:4000'];
        if (validDomains.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        return validDomains[0];
      },
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true,
    }
  });

  httpServer.on('request', app.callback());
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, () => resolve(1)));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);

  app.context.prisma = prisma
}

console.log('🟢 About to start apollo server...')
startApolloServer().then(() => {
  console.log('✅ Apollo server started')
}).catch((err) => {
  console.error('🔴 Error starting apollo server', err)
})

