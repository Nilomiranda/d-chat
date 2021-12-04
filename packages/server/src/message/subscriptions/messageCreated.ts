import { pubsub } from "../..";
import {Message} from "../model";
// import { PubSub } from 'graphql-subscriptions';

// const pubsub = new PubSub();

export const messageCreated = {
  type: Message,
  args: {},
  subscribe() {
    return pubsub.asyncIterator(['MESSAGE_CREATED'])
  }
}
