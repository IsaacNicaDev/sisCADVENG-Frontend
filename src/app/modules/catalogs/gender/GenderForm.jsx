import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGender, updateGender } from "../../features/genders/genderSlice";
import { useNavigate, useParams } from "react-router-dom";


export default function GenderForm() {

    const [gender, setGender] = useState({
        title: "",
        description: "",
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const genders = useSelector(state => state.genders)


    const handleChange = e => {
        //console.log(e.target.name, e.target.value)
        setGender({
            ...gender,
            [e.target.name]: e.target.value,
        })
    };
    const handleSumit = e => {
        e.preventDefault();

        if (params.id) {
            dispatch(updateGender(gender))
        } else {
            //console.log(gender);
            dispatch(addGender(gender))
        }
        navigate('/')
    }

    useEffect(() => {
        if (params.id) {
            setGender(genders.find(gender => gender.id === params.id))
        }
    }, [])

    return (
        <form onSubmit={handleSumit}>
            <input
                name="title"
                type="text"
                placeholder="title"
                onChange={handleChange}
                value={gender.title}
            />

            <textarea
                name="description"
                placeholder="description"
                onChange={handleChange}
                value={gender.description}
            >
            </textarea>

            <button>Save</button>
        </form>
    )
}
