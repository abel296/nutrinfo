import UserRecipeCard from './UserRecipeCard'

import {Row} from 'react-bootstrap'

const UserRecipesList = ({userRecipes, refreshList}) => {
    
    return (
        <Row>
            {userRecipes?.map(elm => <UserRecipeCard key={elm._id} {...elm} refreshList={refreshList} />) }
        </Row>
    )
}

export default UserRecipesList