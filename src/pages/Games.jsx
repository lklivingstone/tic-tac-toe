import './pages.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getGames, getOldGames } from '../redux/apiCalls';
import { Paper } from '@mui/material';
import GameCard from './GameCard';
import { useChatContext } from 'stream-chat-react';
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";

function Games() {
    const { client }= useChatContext()

    // console.log(client)
    const user= useSelector((state)=>state.user.user)

    const username= user.username
    const navigate= useNavigate()

    const handleClick = (e) => {
        navigate("/start")
    }

    const [ games, setGames ]= useState([])
    const [ oldGames, setOldGames ]= useState([])

    useEffect(() => {
        const gamesfunc= async () => {
            try {
                const foundGames= await getGames(username)
                setGames(foundGames)

                // console.log(sortGames)

            } catch (err) {

            }
        }
        gamesfunc()
    },[])

    useEffect(() => {
        const gamesfunc= async () => {
            try {
                const foundGames= await getOldGames(username)
                setOldGames(foundGames)
                
                console.log(foundGames)

            } catch (err) {

            }
        }
        gamesfunc()
    },[])

    // const { client }= useChatContext()
    const dispatch= useDispatch()

    // const navigate= useNavigate()

    const handleLogout = (e) => {
        dispatch(logOut())
        client.disconnectUser()
        navigate("/")

    }


    return (
        <div style={
            {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
            <button className="btn" style={{position: "fixed", top: 0, right: 0, color:"grey", backgroundColor: "transparent", fontWeight: "550", width: "30%", height: "30px" }} onClick={handleLogout}>Logout</button>
            <div style={
                {
                    width: "90vw",
                    paddingTop: "10vh",
                    display: "flex",
                    justifyContent: "flex-start"
                }}>
                <h1 style={{ marginTop: "5px", marginBottom: "25px"}}>Your Games</h1>
                <span style={{marginTop: "5px", marginBottom: "25px", fontWeight: "100"}} >Refresh once after loggin in</span>
            </div>
            <div className="">
                {
                    games.length===0 && oldGames.length===0 ? (
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <span className="header" style={{fontSize: "40px", paddingBottom: "50px"}}>No games found</span>
                            <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleClick}>Start a new game</button>
                        </div>
                    ) : (
                        <h1></h1>
                    )
                }
                {   
                    games.length ===0 ? (
                        <h1></h1>
                        
                    ) : games.map(game => (
                            <GameCard key={game._id} game={game} />
                    ))  
                }
            </div>
            {/* <h1>old</h1> */}
            <div className="">
                {   
                    oldGames.length ===0 ? (
                        <h1></h1>
                        ) : (
                            oldGames.map(game => (
                                <GameCard key={game._id} game={game} />
                            ))  
                    )
                }
            </div>
            <div className="buttons">
                <button className="btn" style={{backgroundColor: "black", width: "100px", fontWeight: "550", fontSize: "10px" , position: "fixed", bottom: "15px", right: "15px", }} onClick={()=> {navigate("/start")}} > + New Game</button>
            </div>
        </div>
    );
}

export default Games;
