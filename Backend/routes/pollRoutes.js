const router = require("express").Router()
const Poll = require("../models/Poll")

router.post("/", async (req, res) => {
  try {
    const poll = await Poll.create(req.body)
    res.status(201).json(poll)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router