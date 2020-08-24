import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        <form>
          <input
            placeholder="personal description"
            name="description"
            type="text"
            value={this.state.description}
            // onChange={this.handleChange}
          ></input>
          <input
            name="shippingAddress"
            placeholder="shipping address"
            type="text"
            value={this.state.shippingAddress}
            // onChange={this.handleChange}
          ></input>
          <input
            name="userImage"
            placeholder="upload image"
            type="file"
            accept="image/png, image/jpeg"
            value={this.state.userImage}
            // onChange={this.handleChange}
          ></input>
        </form>
      </section>
    )
  }
}

export default Form
