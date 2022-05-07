import { gql } from "@apollo/client"

export const MyIdQuery = gql`
  query MyId {
    me {
      id
    }
  }
`

export const GetMyselfQuery = gql`
  query GetMyself {
    me {
      id
      name
      email
      roles
    }
  }
`

gql`
  query Schema {
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }
`
