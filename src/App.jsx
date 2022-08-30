import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthProvider'
import { ChatProvider } from './context/ChatProvider'
import Chat from "./components/Chat"

function App() {
  
    return (
        <BrowserRouter>
            <AuthProvider>
                <ChatProvider>    
                    <Routes>
                        <Route path='/' element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Route>

                        <Route path='/chat' element={<Chat />}></Route> 
                    </Routes>
                </ChatProvider>    
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
