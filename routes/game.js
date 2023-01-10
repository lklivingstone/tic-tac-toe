const router= require("express").Router()
const Game= require("../models/Game")


router.get("/", async (req, res) => {
    try {
        const foundGames= await Game.find().sort({ updatedAt: "desc"})

        res.status(200).json(foundGames)
    } catch(err) {
        res.status(500).json(err)
    }
})

// router.post("/findgame", async(req, res) => {
//     try {
//         const foundGame= await Game.findOne({})
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get("/:username", async (req, res) => {
    try{
        const foundGames= await Game.find().sort({ updatedAt: "desc"})
        const username= req.params.username
        const filteredGames= foundGames.filter(game=> {
            if (game.player1===username || game.player2===username) {
                return true
            }
        })

        res.status(200).json(filteredGames)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req, res) => {
    try{
        const newGame= new Game({
            player1: req.body.player1,
            player2: req.body.player2,
            status: req.body.status,
            progress: req.body.progress,
            turn: req.body.turn,
            updated: new Date().toString()
        })
        const savedGame = await newGame.save()

        res.status(200).json(savedGame)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedGame= await Game.findByIdAndUpdate(req.params.id, {
            // $set: {
            //     turn: req.body.turn,
            //     progress: req.body.progress
            // }

            $set: req.body
            // $set: {
            //     updatedAt: new Date().toLocaleDateString('en-GB').toString()
            // }
        },
        {
            new: true
        })
        // console.log(req.body)
        res.status(200).json(updatedGame)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports= router