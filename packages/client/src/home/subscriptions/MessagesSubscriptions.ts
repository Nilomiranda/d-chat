import { gql } from '@apollo/client'

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageCreated {
    messageCreated {
    id
    content
    user {
        name
        email
        id
      }
    }
  }
`
