const router = require("express").Router()
const Case = require("../models/case")

router.post("/", async (req,res)=>{

try{

const year = new Date().getFullYear()

const count = await Case.countDocuments()

const trackingId = `NEO-${year}-${String(count+1).padStart(3,"0")}`

const newCase = new Case({
...req.body,
trackingId
})

await newCase.save()

res.json(newCase)

}catch(err){

res.status(500).json(err)

}

})



router.get("/", async(req,res)=>{

const cases = await Case.find()

res.json(cases)

})

router.get("/impact", async(req,res)=>{

const resolved = await Case.find({
status:"Resolved"
})

res.json(resolved)

})

module.exports = router