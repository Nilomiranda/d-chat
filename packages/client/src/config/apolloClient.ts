import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: String(import.meta.env.VITE_API_URL || ''),
  cache: new InMemoryCache(),
  credentials: 'include',
});
