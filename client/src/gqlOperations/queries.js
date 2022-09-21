import {gql} from '@apollo/client'
export const GET_ALL_QUOTES =gql`
query getAllQuotes{
    quotes{
    name
    by{
      firstName
    }
  }
}
`
export const GET_ALL_USERS =gql`
query getAllUsers{
    users{
      _id
      email
      firstName
        quotes{
        by
      }
    }
  }
`