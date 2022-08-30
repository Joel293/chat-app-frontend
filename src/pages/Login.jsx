import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import Alert from "../components/Alert";

const Login = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });    
    const { email, password } = data;

    //hooks
    const { setAuth } = useAuth();
    const { alert, setAlert } = useChat();


    const handleInputChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    } 

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes('')){
            return setAlert({
                msg: 'Rellene los campos obligatorios',
                error: true
            });
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, { email, password });
            // console.log(data);
            localStorage.setItem('token', data.token);
            const { id, name:uname, email:uemail } = data;
            setAuth({id, uname, uemail});
            setAlert({});

            setTimeout(() => {
                navigate('/chat');
            }, 500);
            
        } catch (error) {
            console.log(error);
            //TODO: Alerta de error
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return (
        <div className="auth">
            <h2 className="auth__heading">Login</h2>

            <form 
                className="form"
                onSubmit={ handleSubmit }
            >
                 <div className="form__field">
                    <input 
                        type='email'
                        name="email"
                        className="form__input"
                        placeholder="Email"
                        value={email}
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div className="form__field">
                    <input 
                        type='password'
                        name="password"
                        className="form__input"
                        placeholder="Password"
                        value={password}
                        onChange={e => handleInputChange(e)}
                    />
                </div>

                {msg && <Alert {...alert} />}
                <input 
                    type='submit'
                    className="form__submit"
                    value='Log In'
                />

                <div className="form__link">
                    <p className="">
                        Not registered?
                        <Link
                            to='/register'
                        >Create an account 
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login