import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      access_token
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation addUser($userName: String!, $email: String!, $isAdmin: Boolean!, $password: String!) {
    addUser(newUser: { userName: $userName, email: $email, isAdmin: $isAdmin, password: $password }) {
      message
      user {
        userName
        email
      }
    }
  }
`;