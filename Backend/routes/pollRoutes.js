
const router = require("express").Router()
const Poll = require("../models/Poll")
const auth = require("../middleware/authMiddleware")
router.post("/", auth(), async (req, res) => {
  try {
    const poll = await Poll.create(req.body)
    res.status(201).json(poll)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/", async(req,res)=>{

const polls = await Poll.find()

res.json(polls)
})

router.post("/vote", async(req,res)=>{

const {pollId,userId,option}=req.body

if(!pollId || !userId || !option){
  return res.status(400).json("Missing required fields")
}

const poll = await Poll.findById(pollId)

if(!poll){
  return res.status(404).json("Poll not found")
}

const voted = poll.votes.find(v=>v.userId===userId)

if(voted)
return res.json("Already voted")

poll.votes.push({userId,option})

await poll.save()

res.json("Vote recorded")

})

module.exports = router

