import axios from 'axios'

class EdamamService {

    constructor() {
        this.api = axios.create({
            baseURL : 'https://api.edamam.com/api',
        })
    }

    getIngredientInfo = (ingredient, quantity) => this.api.get(`/nutrition-data?app_id=9fcb4124&app_key=a90360aec028b68517fa17842976b5ee&ingr=${quantity}%20g%20${ingredient}`)
    
}

export default EdamamService