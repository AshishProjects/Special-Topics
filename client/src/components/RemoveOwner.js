import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core'
import { GET_OWNERS, REMOVE_OWNERS } from '../queries'
import { filter } from 'lodash'

const RemoveOwners = ({ id, firstName, lastName }) => {
  return (
    <Mutation
      mutation={REMOVE_OWNERS}
      update={(store, { data: { removeOwners } }) => {
        const { owners } = store.readQuery({ query: GET_OWNERS })
        store.writeQuery({
          query: GET_OWNERS,
          data: { owners: filter(owners, c => { return c.id !== removeOwners.id }) }
        })
      }}
    >
      {removeOwners => (
        <Button onClick={e => {
          e.preventDefault()
          removeOwners({
            variables: {
              id
            },
            optimisticResponse: {
              __typename: 'Mutation',
              removeOwners: {
                __typename: 'Owner',
                id,
                firstName,
                lastName
              }
            }
          })
        }}
          variant='contained'
          color='secondary'
          style={{ margin: '5px' }}
        >
          Delete
        </Button>
      )}
    </Mutation>
  )
}

export default RemoveOwners