import './pages.css';
import { useNavigate } from "react-router-dom"

function Home() {

    const navigate= useNavigate()

    const handleRegister = (e) => {
        navigate("/register")
    }

    const handleLogin = (e) => {
        navigate("/login")
    }

  return (
    <div className="App">
        <div className="title">
            <span className="header" style={{paddingBottom: "1em"}}>async</span>
            <span className="header" style={{fontSize: "50px"}}>tic tac toe</span>
        </div>
        <div className="buttons">
            <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleLogin} >Login</button>
            <button className="btn" style={{backgroundColor: "#048DFF", fontWeight: "550"}} onClick={handleRegister} >Register</button>
        </div>
    </div>
  );
}

export default Home;
