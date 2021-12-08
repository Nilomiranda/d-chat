import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query Messages {
  messages {
    id
    content
    user {
      name
      createdAt
    }
  }
}
`
