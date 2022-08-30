import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});

    useEffect(() =>  {
        
        const readToken = async() => {
            const token = localStorage.getItem('token');

            // if(!token || token.length <= 10) {
            // return navigate('/');
            //     return;
            // }

            let config = {
                headers: {
                  xtoken: token,
                }
            }

            try {
                const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/auth`, config);
                const { id, name:uname, email:uemail, token: tokenDB } = data;
                setAuth({id, uname, uemail});
                localStorage.setItem('token', tokenDB); //token renovado
                setTimeout(() => {
                    navigate('/chat');
                }, 500);  
                
            } catch (error) {
                console.log(error);
                //navigate('/'); //Token no válido regresarlo al login
            }
        }

        readToken();

    },[]);


    const handleLogout = (e) => {
        localStorage.removeItem('token');
        setAuth({});
        navigate('/');
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext