import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!) {
        createUser(email: $email, password: $password, name: $name) {
            id
            name
            email
        }
    }
`