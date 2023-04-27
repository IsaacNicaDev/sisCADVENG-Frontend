import { useDispatch } from "react-redux";
import { createUser } from "../../../../features/users/userSlice";
import { getUser } from "../auth-forms/AuthLogin"

export default function Login() {
    const dispatch = useDispatch();

    const login = async () => {
        try {
            const result = await getUser();
            dispatch(createUser(result));
        } catch (error) { }

    };


    return (
        <div>
            <h2>Este es el login Mostro</h2>
            <button onClick={login} >LOGIN</button>
        </div>
    );
}