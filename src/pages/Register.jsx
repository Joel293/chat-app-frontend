import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import useChat from '../hooks/useChat';
import Alert from "../components/Alert";

const Register = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        repeat_password: ''
    });

    const { name, email, password, repeat_password } = data;

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
        
        if([name, email, password, repeat_password].includes('')){
            return setAlert({
                msg: 'Rellene los campos obligatorios',
                error: true
            });
        }

        if(name.length < 2) {
            return setAlert({
                msg: 'El nombre debe ser mayor a dos caracteres',
                error: true
            });
        }

        if(password !== repeat_password) {
            return setAlert({
                msg: 'Las contraseñas no coinciden',
                error: true
            });
        }

        //Register
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, { name, email, password });
            localStorage.setItem('token', data.token);
            const { id, name: uname, email: uemail } = data;
            setAuth({id, uname, uemail});
            setAlert({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlert({})
                navigate('/chat');
            }, 2000);
            
        } catch (error) {
            console.log(error);
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return (
        <div className="auth">
            <h2 className="auth__heading">Sign Up</h2>

            <form 
                className="form"
                onSubmit={ handleSubmit }
            >
                <div className="form__field">
                    <input 
                        type='text'
                        name="name"
                        className="form__input"
                        placeholder="Username"
                        value={name}
                        onChange={e => handleInputChange(e)}
                    />
                </div>

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

                <div className="form__field">
                    <input 
                        type='password'
                        name="repeat_password"
                        className="form__input"
                        placeholder="Repeat password"
                        value={repeat_password}
                        onChange={e => handleInputChange(e)}
                    />
                </div>

                {msg && <Alert {...alert} />}

                <input 
                    type='submit'
                    className="form__submit"
                    value='Sign Up'
                />

                <div className="form__link">
                    <p className="">
                        Already have an account?
                        <Link
                            to='/'
                        >{''}Sign In
                        </Link>
                    </p>
                </div>
                
                
            </form>
        </div>
    )
}

export default Register