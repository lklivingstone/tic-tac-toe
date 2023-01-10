const express= require("express")
const cors= require("cors")
const app= express()
const mongoose= require("mongoose")
require("dotenv/config")


app.use(cors({
    origin: '*'
}));

// app.use(cors())

app.use(express.json())

const authRoute= require("./routes/auth")
const gameRoute= require("./routes/game")

app.use("/api/auth", authRoute)
app.use("/api/game", gameRoute)

// const serverClient= StreamChat.getInstance(process.env.STREAM_KEY, process.env.STREAM_SECRET_KEY)

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.DB_CONNECTION
    ).then(
        () => console.log("Connected to DB")
        ).catch(
            (err)=> {
                console.log(err)
            })

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Listening on port: 5000")
})