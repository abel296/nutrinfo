import UserRecipeCard from './UserRecipeCard'

import {Row} from 'react-bootstrap'

const UserRecipesList = ({userRecipes, refreshList, handleAlert}) => {
    
    return (
        <Row>
            {userRecipes?.map(elm => <UserRecipeCard handleAlert={handleAlert} key={elm._id} {...elm} refreshList={refreshList} />) }
        </Row>
    )
}

export default UserRecipesList