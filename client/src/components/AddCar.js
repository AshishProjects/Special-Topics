import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import uuidv4 from 'uuid/v4'

import { ADD_CAR, GET_CAR } from '../queries'

import { Button, TextField,Select, MenuItem} from '@material-ui/core'
// import { border } from '@material-ui/system';

class AddCar extends Component {
  state = {
    year:'',
    make:'',
    model:'',
    price:'',
    ownerId:''

  }

  render() {
    const { year, make, model,price,ownerId } = this.state
    const id = uuidv4()
    return (
      <Mutation
        mutation={  ADD_CAR}
        update={(store, { data: { addCar } }) => {
          const { cars } = store.readQuery({ query: GET_CAR })
          store.writeQuery({
            query: GET_CAR,
            data: { cars: cars.concat([addCar])}
          })
        }}
      >
        {(addCar, { data, loading, error }) => (
          <form onSubmit={e => {
            e.preventDefault()
            addCar({
              variables: {
                id,
                year,
                make,
                model,
                price,
                ownerId
                        },
              optimisticResponse: {
                __typename: 'Mutation',
                addOwner: {
                  __typename: 'Car',
                  id,
                year,
                make,
                model,
                price,
                ownerId
                }
              }
            })
          }}>
            <TextField
              label='Year'
              value={year}
              placeholder='i.e. 2001'
              onChange={e => this.setState({ year: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px',  border: '2px solid grey'  }}
            />
            <TextField
              label='Make'
              value={make}
              placeholder='i.e. Haundai'
              onChange={e => this.setState({ make: e.target.value })}
              margin='normal'
              varian='outlined'
              
              style={{ 
                margin: '5px',border: '2px solid grey'}}
            />
            <TextField
              label='model'
              value={model}
              placeholder='i.e. Haundai'
              onChange={e => this.setState({ model: e.target.value })}
              margin='normal'
              varian='outlined'
              
              style={{ 
                margin: '5px',border: '2px solid grey'}}
            />
            <TextField
              label='price'
              value={price}
              placeholder='i.e. Haundai'
              onChange={e => this.setState({ price: e.target.value })}
              margin='normal'
              varian='outlined'
              
              style={{ 
                margin: '5px',border: '2px solid grey'}}
            />
            <Select
              label='Owner'
              value={ownerId}
              onChange={e => this.setState({ ownerId: e.target.value })}
              margin='normal'
              style={{ margin: '5px' }}
            >
              <MenuItem value={'1'}>Steve Jobs</MenuItem>
              <MenuItem value={'2'}>Elon Musk</MenuItem>
              <MenuItem value={'3'}>Jeff Bezos</MenuItem>
            </Select>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: '5px' }}
            >
              Add Owner
            </Button>
          </form>
            )}





      
      </Mutation>
    )
  }
}

export default AddCar