import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StartGame from './pages/StartGame';
import Games from './pages/Games';
import Logout from './pages/Logout';
import { useSelector } from 'react-redux';
import { StreamChat } from "stream-chat"
import { Chat } from "stream-chat-react"
import { useChatContext } from 'stream-chat-react';
import { useEffect } from 'react';

const App= () => {

    const user= useSelector((state)=>state.user.user)

  // const STREAM_KEY= "2td7qmsrgf92"

  
  // const client= StreamChat.getInstance(STREAM_KEY)

    const { client }= useChatContext()

    // console.log(client)
    
    console.log(user)

    useEffect(()=> {
      if (user) {
          const token= user?.token
          client.connectUser({
          id: user?._id,
          name: user?.username,
          },
          token).then((u)=> {
          // console.log(u)
          })
      }

    }, [])

  // console.log(client)

  
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element= {<Home />} />
            <Route path="/login" element= {user ? <Navigate to="/mygames" replace /> :  <Login />} />
            <Route path="/register" element= {<Register />} />
            <Route path="/start" element= {<StartGame />} />
            <Route path="/game/:id" element= {<Game />} />
            <Route path="/mygames" element= {<Games />} />
            <Route path="/logout" element= {user ? <Logout /> : <Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
