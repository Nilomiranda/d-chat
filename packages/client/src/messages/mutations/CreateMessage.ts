import { gql } from '@apollo/client'

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($content: String!) {
  createMessage(content: $content) {
    content
  }
}
`
