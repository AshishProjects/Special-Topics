import React from 'react'
import { Query } from 'react-apollo'
// import Car from './Car'
// import { GET_CARLIST } from '../queries'

import { GET_OWNER} from '../queries'
import Owner from './Owner'

import { List, Container } from '@material-ui/core'

const Owners = () => (
  <Query query={GET_OWNER}>
    {({ loading, error, data }) => {
      console.log('data', data) 
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>
      return (
        <ul>
          {data.owners.map(({ id, firstName, lastName }) => (
            <Container>
              <List>
                <Owner
                  key={id}
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                />
              

              </List>
            </Container>
          ))}
        </ul>
        // test 



        
        // test
      )
    }}
  </Query>
  
)

export default Owners