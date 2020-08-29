// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

//UI Imports
import Input from '../../ui/input/Input'
import Textarea from '../../ui/input/Textarea'
import Button from '../../ui/button/Button'

// App Imports
import { updateUserInfo } from './api/actions'
import { upload } from '../common/api/actions'

// Component
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        address: props.user.details.address,
        description: props.user.details.description,
        email: props.user.details.email,
        image: props.user.details.image,
        name: props.user.details.name,
      }  
    }
  }

  // Function bindings
  handleChange = (event) => {
    event.preventDefault()
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.updateUserInfo(this.state.user)
  }

  onUpload = (event) => {
    let data = new FormData()
    data.append('file', event.target.files[0])
    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          let user = {...this.state.user}
          user.image = `/images/uploads/${response.data.file}`
          this.setState({
            user
          })
        }
      })
  } 

  render() {
    return (
      // Profile Form
      <section>
        <form className='profile-form'>
        <p>Select a profile photo from our list of images!</p>
        <Input
            name="image"
            placeholder="upload image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={event => this.onUpload(event)}
          />
          <Input
            name="email"
            placeholder="email"
            type="text"
            value={this.state.user.email}
            onChange={this.handleChange}
          />
          <Input
            name="address"
            placeholder="address"
            type="text"
            value={this.state.user.address}
            onChange={this.handleChange}
          />
          <Textarea
            placeholder="personal description"
            name="description"
            type="text"
            value={this.state.user.description}
            onChange={this.handleChange}
          />
          <Button type='submit' onClick={this.onSubmit}> 
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

// Component Properties
// Form.PropTypes = {

// }

// Component State
function formState(state) {
  return {
    user: state.user
  }
}

export default connect(formState, { updateUserInfo, upload } )(Form)
