import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import io from 'socket.io-client';
import generarId from "../helpers/generarId";
import RightBox from "./RightBox";
import LeftBox from "./LeftBox";
import useChat from '../hooks/useChat';
import useAuth from '../hooks/useAuth';

let socket;

const Chat = () => {

    const { auth, handleLogout } = useAuth();
    const { id } = auth; //Usuario Autenticado;
    
    if(!id) return <Navigate to='/'/>
    
    const { setUsers, last10Messages, setLast10Messages } = useChat();
    const [text, setText] = useState('');


    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL, {
            'extraHeaders': {
                'xtoken': localStorage.getItem('token')
            }
        });
    }, []);

    useEffect(() => {

        socket.on('recibir mensajes', (last10Mes) => {
            setLast10Messages(last10Mes);
        });

        socket.on('usuarios activos', (users) => {
            setUsers(users);
        });

        socket.on('mensaje privado', (payload) => {
          console.log('Privado:', payload)
        });

    });
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(text.length <= 0) return;


        let date = new Date();
        date = date.getHours().toString() + ':' + date.getMinutes().toString(); 
        
        const message = {text, sent: date};

        let id = '';
        //let id = '630d10f530bed5e1c351f885'; //id de la persona a la que quiero enviar
        socket.emit('enviar mensaje', { message, id });
        setText('');
        
    }

    return (
        <div className="container">
            <div className="chat">
                <div className="chat-header">
                    <button
                        type="button"
                        className="chat-logout"
                        onClick={handleLogout}
                        
                    >Logout</button>

                </div>

                <div className="chat-box">
                    { last10Messages.map(msg => {
                        if(msg.id === id) {
                            return <RightBox
                                        message={msg.mensaje} 
                                        date={msg.fecha}
                                        key={generarId()} 
                                    />
                        }
                        else {
                            return <LeftBox 
                                        name={msg.nombre}
                                        message={msg.mensaje} 
                                        date={msg.fecha}
                                        key={generarId()} 
                                    />
                        }
                    })}
                </div>

                <form
                    onSubmit={ handleSubmit } 
                    className="chat-footer"
                >
                    <textarea 
                        placeholder="Type a message"
                        className='chat-input'
                        value={ text }
                        onChange={ e => setText(e.target.value) }
                    ></textarea>
                    <input 
                        type='submit'
                        className="chat-submit"
                        value='Send'  
                    />
                </form>
            </div>
        </div>
    )
}

export default Chat