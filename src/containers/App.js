import React, { Component } from 'react'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'

import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'

import ReviewForm from '../components/ReviewForm'
import AddRestaurantForm from '../components/AddRestaurantForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants,
      reviews,
      selectedId: restaurants[0].id
    }
    this.restaurantClick = this.restaurantClick.bind(this)
    this.reviewSubmit = this.reviewSubmit.bind(this)
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  reviewSubmit (submission) {
    submission.restaurant_id = this.state.selectedId
    this.setState({ reviews: this.state.reviews.concat(submission) })
  }

  render() {
    let restaurantComponents = restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })

    let relevantReviews = this.state.reviews.filter((review) =>
      (this.state.selectedId === review.restaurant_id)
    )

    return(
      <div>
        <div className="row">
          <div className="small-3 columns">
            <h1>Restaurant</h1>
            {restaurantComponents}
            <AddRestaurantForm />
          </div>
          <div className="small-9 columns">
            <h2>Reviews for {this.selectedRestaurant().name}</h2>
            <Reviews data={relevantReviews} />
            <ReviewForm
            reviewSubmit={this.reviewSubmit}
            restaurant_id={this.state.selectedId}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
