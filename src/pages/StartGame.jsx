import './pages.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllGames, startGame } from '../redux/apiCalls';


function StartGame() {


    const navigate= useNavigate()

    const user= useSelector((state)=>state.user.user)
    const username= user.username
    // console.log(user)
    const [ opponent, setOpponent ]= useState("")

    const [ channel, setChannel ]= useState(null)

    const { client }= useChatContext()


    const createChannel = async (e) => {
        try {
        
            const res= await client.queryUsers({
                name: {
                    $eq: opponent
                }
            })

            if (res.users.length === 0) {
                alert("User not found")
                return
            }

            // const foundGames= getAllGames()
            // foundGames.map((game)=> {
            //     if ( (game.player1===user.username && game.player2===opponent) || (game.player2===user.username && game.player1===opponent) ) { 
            //         if (game.status==="live") {
            //             alert("Game already exists!")
            //             return
            //         }
            //     }
            // })

            e.preventDefault()

            const start= ["", "", "", "", "", "", "", "", ""]

            startGame({ player1: username, player2: opponent, status: "live", progress: start, turn: "X" })

            navigate(`/game/${opponent}`)
        } catch(err) {
            alert("Invalid user")
            return
        }

        // const newChannel= await client.channel("messaging", {
        //     members: [user._id, res.users[0].id]
        // })

        // await newChannel.watch()
        // setChannel(newChannel)
    }

    return (
        <>{
            channel? (
                <h1>starter</h1>
            ) : (
        <div className="App">
        <div className="back-btn" onClick={() => {navigate(-1)}} >
            <ArrowBackIosIcon />
        </div>
        <div className="register-card">
            <span>Start a new game</span>
            <h1 style={{ marginTop: "5px", marginBottom: "25px"}}>Whom do you want to play with</h1>
            <label style={{fontWeight: "600"}}>Email</label>
            <input type="text" name="email" placeholder="Type their email here" onChange={(e)=> {
                setOpponent(e.target.value)
            }} required />
        </div>
        <div className="buttons">
            <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={createChannel} >Start game</button>
        </div>
        </div>
            )
        }
        </>
    );
}

export default StartGame;
