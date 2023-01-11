import './pages.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllGames, getGames, getUsers, startGame } from '../redux/apiCalls';


function StartGame() {


    const navigate= useNavigate()

    const user= useSelector((state)=>state.user.user)
    const username= user.username
    // console.log(user)
    const [ opponent, setOpponent ]= useState("")

    const [ channel, setChannel ]= useState(null)

    const { client }= useChatContext()

    const [ users, setUsers ]= useState([])
    const [ games, setGames ]= useState([])

    useEffect(()=> {
        const gamesfunc= async () => {
            try {
                const foundGames= await getGames(username)
                setGames(foundGames)
                const foundUsers= await getUsers()
                setUsers(foundUsers)
                // console.log(sortGames)

            } catch (err) {

            }
        }
        gamesfunc()
    }, [])

    const createChannel = async (e) => {
        try {

            let userPresent= false

            users.map((single)=> {
                if (single.username===opponent) {
                    userPresent= true
                }
            })

            let gamePresent= false

            games.map((single) => {
                if ((single.player1===username && single.player2===opponent) || single.player2===username && single.player1===opponent) {
                    gamePresent= true
                }
            })

            if (gamePresent===false && userPresent) {
                const res= await client.queryUsers({
                    name: {
                        $eq: opponent
                    }
                })
    
                if (res.users.length === 0) {
                    alert("User not found")
                    return
                }
    
    
                e.preventDefault()
    
                const start= ["", "", "", "", "", "", "", "", ""]
    
    
                
    
                startGame({ player1: username, player2: opponent, status: "live", progress: start, turn: "X" }).then((res)=>{
                    navigate(`/game/${opponent}`)
                }).catch((err)=> {
                    alert("Invalid")
                })
            }
            else {
                alert("User not found")
                return
            }


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

    const handleSubmit= () => {
        
        
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
            <label style={{fontWeight: "600"}}>Username</label>
            <input type="text" name="email" placeholder="Type their username here" onChange={(e)=> {
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