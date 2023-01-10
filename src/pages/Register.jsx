import './pages.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { register } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate= useNavigate()

  const [ clicked, setClicked ]= useState(false)
  const [ name, setName ]= useState("")
  const [ username, setUsername ]= useState("")
  const [ email, setEmail ]= useState("")
  const [ password, setPassword ]= useState("")

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const regUser= await register({name, username, email, password})
      // console.log(regUser)
      setClicked()
      setName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setClicked(true)
      navigate("/login")
    } catch (err) {

    }
  }

  return (
    <div className="App">
      <div className="back-btn" onClick={() => {navigate(-1)} } >
        <ArrowBackIosIcon />
      </div>
      <div className="register-card">
        <span>Create account</span>
        <h1 style={{ marginTop: "5px", marginBottom: "25px"}}>Let's get to know your better!</h1>
          <label style={{fontWeight: "600"}}>Your name</label>
          <input type="text" name="name" value={name} placeholder="Type your name here" required onChange={(e) => setName(e.target.value)} />
          <label style={{fontWeight: "600"}}>Username</label>
          <input type="text" name="username" value={username} placeholder="Type your username here" required onChange={(e) => setUsername(e.target.value)} />
          { !clicked && <label style={{fontWeight: "600"}}>Email</label>}
          { !clicked && <input type="text" name="email" value={email} placeholder="Type your email here" required onChange={(e) => setEmail(e.target.value)} />}
          <label style={{fontWeight: "600"}}>Password </label>
          <input type="password" name="password" value={password} placeholder="Type your password here" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="buttons">
        { !clicked && <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleSubmit} >Register</button>}
        { clicked && <button className="btn" style={{backgroundColor: "lightgreen", height: "70px", fontWeight: "400"}}>Congratulations!!! Account created.</button>}
        { clicked && <button className="btn" style={{backgroundColor: 'lightgrey', fontWeight: "550"}}>Register</button>}
      </div>
    </div>
  );
}

export default Register;
