import {Component} from 'react'

import ReactStars from "react-rating-stars-component"

import RatingsService from '../../../service/ratings.service'

class Rating extends Component {

    constructor() {
        super()
        this.state = {
            rating: 0
        }

        this.ratingsService = new RatingsService()
    }

    handleInputChange(newValue) {
        
        this.setState({rating: newValue}, () => this.createRating())
        
    }

    createRating() {
        
        this.ratingsService
            .createRating(this.props.param, this.state)
            .then(response => {
            if (response.data.message) {
                this.props.handleAlert(true, 'Error', response.data.message)
            }
            this.props.refreshList()
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
            <ReactStars size={30} isHalf={true} onChange={newValue => this.handleInputChange(newValue)} />
            {this.props.recipeRating === 'NaN' ? <p></p> : <h6>{this.props.recipeRating}</h6>}
            
            </>
        )
    }   
}

export default Rating