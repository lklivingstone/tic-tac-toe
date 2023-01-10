import './pages.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllGames, updateGame } from '../redux/apiCalls';
import { Patterns } from '../data/WinningPatterns';


function Game() {

    const location= useLocation()
    const opponent= location.pathname.split("/")[2]

    const navigate= useNavigate()

    const user= useSelector((state)=>state.user.user)
    const username= user.username

    const [ channel, setChannel ]= useState(null)

    const { client }= useChatContext()

    const [ games, setGames ]= useState([])
    const [ p1, setP1 ]= useState("")
    const [ p2, setP2 ]= useState("")

    const [ board, setBoard ]= useState(["", "", "", "", "", "", "", "", ""])

    const [headerText, setHeaderText]= useState("Your move")


    // useEffect(() => {
    //     checkWin()
    //     checkTie()
    // }, [board])

    useEffect(() => {
        const gamesfunc= async () => {
            try {
                const foundGames= await getAllGames()
                setGames(foundGames)
            } catch (err) {

            }
        }
        gamesfunc()

        
    }, [])

    const [player, setPlayer ]= useState("X")

    const [turn, setTurn ]= useState("X")

    const [ currGame, setCurrGame ]= useState()

    const [ result, setResult ]= useState({winner: "none", state: "none"})


    useEffect(()=> {
        games.map(game=> {
            if ( (game.player1===user.username && game.player2===opponent && game.status==="live") || (game.player2===user.username && game.player1===opponent && game.status==="live") ) {
                setCurrGame(game)
                setBoard(game.progress)
                setTurn(game.turn)
                setP1(game.player1)
                setP2(game.player2)
                if (username===game.player2) {
                    setPlayer("O")
                }
                if (game.status==="live") {
                    setResult({winner: "none", state: "none"})
                }
                else if (game.status==="draw") {
                    setResult({winner: "draw", state: "draw"})
                }
                else if (game.status===username) {
                    setResult({winner: username, state: "over"})
                }
                else {
                    setResult({winner: opponent, state: "over"})
                }
                // console.log(game)
            }
        })
    }, [games])


    useEffect(() => {
        const createChannel = async () => {
            try{
                    const res= await client.queryUsers({
                    name: {
                        $eq: opponent
                    }
                })
        
                if (res.users.length === 0) {
                    alert("User not found")
                    return
                }
        
        
                const newChannel= await client.channel("messaging", {
                    members: [client.userID, res.users[0].id]
                })

                // console.log(res.users[0])
        
                await newChannel.watch()
                setChannel(newChannel)
            } catch(err) {

            }
        }
        createChannel()
    }, [])
    
    

    const chooseSquare = async (sq) => {
        // console.log(turn)
        try {
            console.log(result?.status)
            if ( result?.winner=="none" && turn===player && board[sq]==="" ) {
                setTurn(player==="X" ? "O" : "X")
                
                await channel.sendEvent({
                    type: "game-move",
                    data: {
                        sq,
                        player
                    }
                })

                setBoard((board.map((val, idx) => {
                    // console.log(sq)
                    // console.log(board[idx], idx)
                    // console.log(board)
                    if (idx===sq && val==="") {
                        // console.log(idx)
                        return player
                    }
                    else {
                        return val 
                    }
                })))

                // console.log(board)

                updateGame({id: currGame?._id, 
                    values: {
                        progress: board,
                        turn: turn,
                        updated: new Date().toString()                    }
                })



                // console.log(currGame)
                

                // console.log(turn, board)

            }
            
            // window.location.reload(false)
            // console.log(sq)
        }
        catch(err) {

        }
    }

    useEffect(() => {
        if (currGame) {
            // console.log(board)
            updateGame({id: currGame?._id, 
                values: {
                    progress: board,
                    turn: turn,
                    updated: new Date().toString()
                }
            })
            if (turn===player) {
                setHeaderText("Your move")
            }
            else if (turn!==player) {
                setHeaderText("Their move")
            }

            checkWin()
            checkTie()
        }
    }, [board])

    

    // console.log(client)
    channel?.on((event)=> {
        // console.log(event.user)
        if (event.type=="game-move" && event.user.id !== client.userID) {
            const currPlayer= event.data.player === "X" ? "O" : "X"
            setPlayer(currPlayer)
            setTurn(currPlayer)
            setBoard(board.map((val, idx) => {
                if (idx===event.data.sq && val==="") {
                    return event.data.player
                }
                else {
                    return val
                }
            }))
            // window.location.reload(false)
        }
    })


    

    // console.log(result.winner)

    const checkWin = () => {
        Patterns.forEach((pattern) => {
            const firstPlayer= board[pattern[0]]

            if (firstPlayer == "") {
                return
            }

            let foundWinningPattern= true

            pattern.forEach((idx)=> {
                if (board[idx] != firstPlayer) {
                    foundWinningPattern= false
                }
            })

            if (foundWinningPattern) {
                if (board[pattern[0]]==="X" && player==="X") {
                    setResult({ winner: username, state: "over"})
                } 
                else if (board[pattern[0]]==="X" && player==="O") {
                    setResult({ winner: opponent, state: "over"})
                } 
                else if (board[pattern[0]]==="O" && player==="O") {
                    setResult({ winner: username, state: "over"})
                } 
                else {
                    setResult({ winner: opponent, state: "over"})
                } 

                if (result.winner===username) {
                    updateGame({id: currGame?._id, values: {
                        status: username,
                        updated: new Date().toString()
                    }})
                }
                else if (result.winner===opponent) {
                    updateGame({id: currGame?._id, values: {
                        status: opponent,
                        updated: new Date().toString()

                    }})
                }

                // if (currGame?.status==username) {
                //     setHeaderText("You win")
                // }
                // else if (currGame?.status=='draw') {
                //     setHeaderText("It's a draw")
                // }
                // else {
                //     setHeaderText("They won")
                // }


                // alert("Winner", board[pattern[0]])
                // console.log("won")
            }

        })
    }

    

    const checkTie = () => {
        let filled = true
        board.forEach((sq)=> {
            if (sq=="") {
                filled= false
            }
        })

        if (filled) {
            setResult({winner: "draw", status: "draw"})
            updateGame({id: currGame?._id, values: {
                status: "draw",
                updated: new Date().toString()            
            }})
            // alert("Draw")
        }
    }

    
    useEffect(() => {

        if (result.winner==="none") {
            if (turn === player) {
                setHeaderText("Your move")
            }
            else {
                setHeaderText("Their move")
            }
        }
        else if (result.winner===username) {
            setHeaderText("You win")
        }
        else if (result.winner==='draw') {
            setHeaderText("It's a draw")
        }
        else {
            setHeaderText("They won")
        }


        // if (result.winner==="X") {
        //     updateGame({id: currGame?._id, values: {
        //         status: p1,
        //     }})
        // }
        // else if (result.winner==="O") {
        //     updateGame({id: currGame?._id, values: {
        //         status: p2,
        //     }})
        // }
        // else if (result.winner==="draw") {
        //     updateGame({id: currGame?._id, values: {
        //         status: "draw",
        //     }})
        // }
    }, [result])

    // useEffect(() => {
    //     if (currGame) {
    //         if (currGame?.status==="live") {
    //             if (turn == player) {
    //                 setHeaderText("Your move")
    //             }
    //             else {
    //                 setHeaderText("Their move")
    //             }
    //         }
    //         else if (currGame?.status==username) {
    //             setHeaderText("You win")
    //         }
    //         else if (currGame?.status=='draw') {
    //             setHeaderText("It's a draw")
    //         }
    //         else {
    //             setHeaderText("They won")
    //         }
    //     }

    // }, [currGame])



    return (
        <div className="App">
            <div className="back-btn" onClick={() => {navigate(-1)}}>
                <ArrowBackIosIcon />
            </div>
            <div className="register-card">
                <h1 style={{ marginTop: "5px"}}>Game with {opponent}</h1>
                <span style={{marginTop: "5px", marginBottom: "25px", fontWeight: "100"}} >Your piece</span>
                {player==="X" && (
                    <h1 className='x'>X</h1>
                )}
                {player==="O" && (
                    <h1 className='o'>O</h1>
                )}
                {/* <h1 className='o'>O</h1> */}
                <div className="container">
                    <h3 className="game-header">
                        {headerText}
                    </h3>
                    
                    <div className="board">
                        <div className='column'>
                            <div id="block_0" className="block" onClick={()=> {
                                chooseSquare(0)
                                // console.log(1)
                            }}>{board[0]}</div>
                            <div id="block_1" className="block" onClick={()=> {
                                chooseSquare(1)
                            }}>{board[1]}</div>
                            <div id="block_2" className="block" onClick={()=> {
                                chooseSquare(2)
                            }}>{board[2]}</div>
                        </div>
                        <div className='column'>
                            <div id="block_3" className="block" onClick={()=> {
                                chooseSquare(3)
                            }}>{board[3]}</div>
                            <div id="block_4" className="block" onClick={()=> {
                                chooseSquare(4)
                            }}>{board[4]}</div>
                            <div id="block_5" className="block" onClick={()=> {
                                chooseSquare(5)
                            }}>{board[5]}</div>
                        </div>
                        <div className='column'>
                            <div id="block_6" className="block" onClick={()=> {
                                chooseSquare(6)
                            }}>{board[6]}</div>
                            <div id="block_7" className="block" onClick={()=> {
                                chooseSquare(7)
                            }}>{board[7]}</div>
                            <div id="block_8" className="block" onClick={()=> {
                                chooseSquare(8)
                            }}>{board[8]}</div>
                        </div>
                    </div>
                    {/* <div className="play-area">
                        <div id="block_0" className="block">{board[0]}</div>
                        <div id="block_1" className="block">{board[1]}</div>
                        <div id="block_2" className="block">{board[2]}</div>
                        <div id="block_3" className="block">{board[3]}</div>
                        <div id="block_4" className="block">{board[4]}</div>
                        <div id="block_5" className="block">{board[5]}</div>
                        <div id="block_6" className="block">{board[6]}</div>
                        <div id="block_7" className="block">{board[7]}</div>
                        <div id="block_8" className="block">{board[8]}</div>
                    </div> */}
                </div>
            </div>
            <div className="buttons">
                <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}}>Start game</button>
            </div>
        </div>
    );
}

export default Game;
