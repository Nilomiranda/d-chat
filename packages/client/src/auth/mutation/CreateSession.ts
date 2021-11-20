import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
  createSession(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
`
