import { useSelector, useDispatch } from "react-redux";
import { deleteGender } from "../../features/genders/genderSlice";
import { Link } from "react-router-dom";

export default function GenderList() {

    const genders = useSelector(state => state.genders)
    //console.log(genders)
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        //console.log(id)
        dispatch(deleteGender(id))
    }

    return (
        <div>
            <header>
                <h1>Gender {genders.length}</h1>
                <Link to='/create-gender'>
                    Create Gender
                </Link>
            </header>

            {genders.map(gender => (
                <div key={gender.id}>
                    <h3>{gender.title}</h3>
                    <p>{gender.description}</p>
                    <button onClick={() => handleDelete(gender.id)}>Delete</button>
                    <Link to={`/edit-gender/${gender.id}`} >Edit</Link>
                </div>
            ))}
        </div>
    )
}
