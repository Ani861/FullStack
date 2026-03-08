const router = require("express").Router()
const Case = require("../models/case")

=
router.post("/", async (req,res)=>{

try{

const newCase = new Case(req.body)

await newCase.save()

res.json(newCase)

}catch(err){

res.status(500).json(err)

}

})

router.get("/", async (req,res)=>{

try{

const cases = await Case.find()

res.json(cases)

}catch(err){

res.status(500).json(err)

}

})

module.exports = router