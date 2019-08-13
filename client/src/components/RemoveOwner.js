import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core'
import { GET_OWNER, REMOVE_OWNER } from '../queries'
import { filter } from 'lodash'

const RemoveOwner = ({ id, firstName, lastName }) => {
  return (
    <Mutation
      mutation={REMOVE_OWNER}
      update={(store, { data: { removeOwner } }) => {
        const { owners } = store.readQuery({ query: GET_OWNER })
        store.writeQuery({
          query: GET_OWNER,
          data: { owners: filter(owners, c => { return c.id !== removeOwner.id }) }
        })
      }}
    >
      {removeOwner => (
        <Button onClick={e => {
          e.preventDefault()
          removeOwner({
            variables: {
              id
            },
            optimisticResponse: {
              __typename: 'Mutation',
              removeOwner: {
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

export default RemoveOwner