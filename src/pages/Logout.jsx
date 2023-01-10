import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { useChatContext } from 'stream-chat-react';

function Logout() {
    const { client }= useChatContext()
    const dispatch= useDispatch()

    const navigate= useNavigate()

    const handleClick = (e) => {
        dispatch(logOut())
        client.disconnectUser()
        navigate("/")

    }

    return (
        <div>
            <button className="btn" style={{backgroundColor: "#E8C602", fontWeight: "550"}} onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Logout;
