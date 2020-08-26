import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from '../../ui/input/Input'
import Textarea from '../../ui/input/Textarea'
import Button from '../../ui/button/Button'
import { updateUserInfo } from './api/actions'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
        description: '',
        address: '',
        image: '',
    }
  }

  handleChange = (event) => {
    this.setState( { [event.target.name]: event.target.value} );
  }

  onSubmit = (event) => {
    this.setState( { [event.target.name]: event.target.value} );
    console.log(this.state)
    this.props.updateUserInfo(this.state)
  }


  render() {
    // console.log(this.state)
    return (
      <section>
        <form className='profile-form'>
        <Input
            name="image"
            placeholder="upload image"
            type="file"
            accept="image/png, image/jpeg"
            value={this.state.userImage}
            onChange={this.handleChange}
          />
          <Input
            name="address"
            placeholder="shipping address"
            type="text"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
          <Textarea
            placeholder="personal description"
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button onClick={this.onSubmit}> 
            Submit Changes
          </Button>
        </form>
        {/* language=CSS */}
        {/* <style jsx>{`
          .profile-form {
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
            width: 20%;
          }
        `} */}
      </section>
    )
  }
}

function formState(state) {
  return {
    user: state.user.details
  }
}

export default connect(formState, { updateUserInfo } )(Form)
