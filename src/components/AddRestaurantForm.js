import React from 'react';
import TextField from './TextField'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      nameEntry: "",
      photoEntry: "",
      locationEntry: "",
      restaurant_id: this.props.restaurant_id
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateNameChange(this.state.nameEntry) &&
      this.validateStarSelection(this.state.starSelected)
    ) {
      let formPayload = {
        name: this.state.nameEntry,
        content: this.state.textEntry,
        rating: this.state.starSelected.length*20,
        restaurant_id: this.state.restaurant_id
      };
      this.props.reviewSubmit(formPayload);
      console.log(formPayload);
    }
  }

  handleNameChange(event) {
    this.validateNameChange(event.target.value)
    this.setState({ nameEntry: event.target.value })
  }

  handlePhotoChange(event) {
    this.setState({ photoEntry: event.target.value })
  }

  handleLocationChange(event) {
    this.setState({ locationEntry: event.target.value })
  }

  validateNameChange(name) {
    if (name === '' || name === ' ') {
      let newError = { nameEntry: 'Name may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.nameEntry
      this.setState({ errors: errorState })
      return true
    }
  }

  validateStarSelection(selection) {
    if (selection === '') {
      let newError = { starSelected: 'You must select a rating.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.starSelected
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <TextField
          name="name"
          label="Name"
          className="small-7 columns"
          handlerFunction={this.handleNameChange}
          content={this.nameEntry}
        />
        <TextField
          name="photo"
          className="small-5 columns"
          label="Add a Photo"
          handlerFunction={this.handleTextChange}
          content={this.state.textEntry}
        />
        <TextField
          name="location"
          className="small-12 columns"
          label="Review Text"
          handlerFunction={this.handleTextChange}
          content={this.state.textEntry}
        />

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default ReviewForm;
