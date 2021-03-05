import RecipeForm from "../Recipe-form/Recipe-form"

const Profile = ({loggedUser}) => {
    return (
        <>
        <h1>Profile</h1>
        <RecipeForm loggedUser={loggedUser}></RecipeForm>
        </>
    )
}

export default Profile