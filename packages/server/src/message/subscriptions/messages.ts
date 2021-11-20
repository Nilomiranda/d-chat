import {Message} from "../model";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const messages = {
  type: Message,
  args: {},
  subscribe() {
    return pubsub.asyncIterator(['MESSAGE_CREATED'])
  }
}
