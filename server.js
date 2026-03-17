import express from "express"
import Redis from "ioredis"

const app = express()

app.use(express.json())
app.use(express.static("public"))

const redis = new Redis(process.env.REDIS_URL)

const MATCH_ID = "match1"

app.get("/api/match", async (req,res)=>{

 const data = await redis.hgetall(`match:${MATCH_ID}`)

 res.json({
  team1:data.team1 || "Team A",
  team2:data.team2 || "Team B",
  score1:data.score1 || 0,
  score2:data.score2 || 0,
  odds1:1.8,
  odds2:2.0
 })
})

app.post("/api/bet",(req,res)=>{

 const {team,amount} = req.body

 console.log("bet",team,amount)

 res.json({ok:true})
})

app.listen(process.env.PORT || 3000,()=>{
 console.log("server running")
})