import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../ui/input/Input'
import Textarea from '../../ui/input/Textarea'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        description: '',
        shippingAddress: '',
        userImage: '',
      }
    }
  }

  handleChange = (event) => {
    this.setState( { [event.target.name]: event.target.value} );
  }

  render() {
    return (
      <section>
        <form className='profile-form'>
        <Input
            name="userImage"
            placeholder="upload image"
            type="file"
            accept="image/png, image/jpeg"
            value={this.state.userImage}
            onChange={this.handleChange}
          />
          <Input
            name="shippingAddress"
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

export default Form
