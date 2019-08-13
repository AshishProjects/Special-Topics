import { gql } from 'apollo-boost'

export const GET_OWNERS = gql`
  {
    owners {
      id
      firstName
      lastName
    }
  }
`

export const ADD_OWNERS = gql`
  mutation AddOwner($id: String!, $firstName: String!, $lastName: String!) {
    addOwner(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_OWNERS = gql`
  mutation UpdateOwner($id: String!, $firstName: String!, $lastName: String!) {
    updateOwner(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_OWNERS = gql`
  mutation RemoveOwner($id: String!) {
    removeOwner(id: $id) {
      id
      firstName
      lastName
    }
  }
`