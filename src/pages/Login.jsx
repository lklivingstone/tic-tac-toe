import './pages.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls"
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate= useNavigate()
    
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")

    const dispatch= useDispatch()
    const { isFetching, error }= useSelector(state=>state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }

    return (
        <div className="App">
        <div 
            className="back-btn" 
            onClick={() => {
                navigate(-1)
                }
            }>
            <ArrowBackIosIcon />
        </div>
        <div className="register-card">
            <span>Login</span>
            <h1 style= {
                    { 
                        marginTop: "5px", 
                        marginBottom: "25px"
                    }
                }>
                Please enter your details
            </h1>
            <label style= {
                    {
                        fontWeight: "600"
                    }
                }>
                Username
            </label>
            <input type="text" 
                name="username" 
                placeholder="Type your username here" 
                onChange={(e)=>setUsername(e.target.value)} 
                required />
            <label 
                style={
                    {
                        fontWeight: "600"
                    }
                }>
            Password 
            </label>
            <input type="password" 
                name="password" 
                placeholder="Type your password here" 
                onChange={(e)=>setPassword(e.target.value)} 
                required />
        </div>
        <div className="buttons">
            { error && <button className="btn" style={{backgroundColor: "red", height: "70px", fontWeight: "400"}}>Enter correct details.</button>}
            { !isFetching &&
                <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleClick} disabled={isFetching} >Login</button>
            }
            { isFetching &&
                <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} disabled={isFetching} >Loading...</button>

            }
        </div>
        </div>
    );
}

export default Login;
