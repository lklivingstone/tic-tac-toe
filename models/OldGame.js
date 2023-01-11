const mongoose= require("mongoose")

const OldGameSchema= new mongoose.Schema(
    {
        player1: {
            type: String,
            required: true
        },
        player2: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        progress : {
            type: Array,
            required: true,
        },
        turn : {
            type: String,
            required: true,
        },
        updated : {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports= mongoose.model("OldGame", OldGameSchema)