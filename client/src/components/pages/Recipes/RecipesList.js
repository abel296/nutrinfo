import RecipeCard from './RecipesCard'

import {Row} from 'react-bootstrap'

const RecipesList = ({recipes}) => {
    
    return (
        <Row>
            {recipes?.map(elm => <RecipeCard key={elm._id} {...elm} />) }
        </Row>
    )
}

export default RecipesList