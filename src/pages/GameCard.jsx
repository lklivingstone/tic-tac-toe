import './pages.css';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function GameCard({ game }) {

    const user= useSelector((state)=>state.user.user)
    const username= user.username

    const navigate= useNavigate()

    const p1= game.player1
    const p2= game.player2
    let other= ""
    if (p1===username) {
        other= p2
    }
    else {
        other= p1
    }
    
    let myturn= false

    if (p1===username) {
        if (game.turn%2 == 0) {
            myturn=true
        }
        else {
            myturn= false
        }
    }
    else {
        if (game.turn%2 == 0) {
            myturn= false
        }
        else {
            myturn= true
        }
    }

    let currStatus= ""

    if (game.status==="live") {
        if (myturn) {
            currStatus= `${other} just made their move!
            It's your turn to play now`
        }
        else {
            currStatus= `You've made your move!
            Waiting for them.`
        }
    }
    else {
        if (game.status===username) {
            currStatus= `You won!`
        }
        else if (game.status==="draw") {
            currStatus= "It's a Draw!"
        }
        else {
            currStatus= "They won"
        }
    }

    const time= game.updated
    const month= time.split(" ")[1]
    const day= time.split(" ")[2]
    const year= time.split(" ")[3]
    const timing= time.split(" ")[4]


    const handleClick = (e) => {
        navigate(`/game/${other}`)
        // navigate("/login")
    }

    // console.log(game)

    return (
        <Paper elevation={24} 
            style={
                {
                    display: "flex",
                    padding: "15px",
                    justifyContent: "left",
                    flexDirection: "column",
                    height: "200px",
                    width: "85vw",
                    marginBottom: "20px"
                }}>
            <div style={{height: "20%", paddingBottom: "5px"}} >
                <h2>Game with { game.player1===username ? game.player2 : game.player1 }</h2>
            </div>
            <div style={{height: "45%"}}>
                <span style={{fontSize: "20px"}} >
                    {currStatus}
                </span>
            </div>
            <div style={{display: "flex", justifyContent: "left", height: "15%"}} >
                <span>{day} {month} {year} {timing}</span>
            </div>
            <div style={{display: "flex", justifyContent: "center", height: "20%"}} >
                <button className="btn" style={{ width: "100%", backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleClick} >{ game.status==="live" ? "Play!" : "View game" }</button>
            </div>

        </Paper>
    )
}

export default GameCard