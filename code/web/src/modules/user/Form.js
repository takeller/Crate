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

  //   onSubmit = (event) => {
  //   event.preventDefault()

  //   this.setState({
  //     isLoading: true
  //   })

  //   this.props.messageShow('Signing you up, please wait...')

  //   this.props.register(this.state.user)
  //     .then(response => {
  //       this.setState({
  //         isLoading: false
  //       })

  //       if (response.data.errors && response.data.errors.length > 0) {
  //         this.props.messageShow(response.data.errors[0].message)
  //       } else {
  //         this.props.messageShow('Signed up successfully.')

  //         this.props.history.push(userRoutes.login.path)
  //       }
  //     })
  //     .catch(error => {
  //       this.props.messageShow('There was some error signing you up. Please try again.')

  //       this.setState({
  //         isLoading: false,
  //         error: 'Error signing up.'
  //       })
  //     })
  //     .then(() => {
  //       window.setTimeout(() => {
  //         this.props.messageHide()
  //       }, 5000)
  //     })
  // }

  render() {
    // console.log(props)
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
          <Button onClick={this.props.updateUserInfo}> 
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
