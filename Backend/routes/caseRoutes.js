
const router = require("express").Router()
const Case = require("../models/case")
const auth = require("../middleware/authMiddleware")

async function checkEscalation(){
  const cases = await Case.find({ status: "Assigned" })
  const now = new Date()

  for(const c of cases){
    const diffDays = (now - new Date(c.createdAt)) / (1000*60*60*24)

    if(diffDays > 7){
      c.status = "Escalated"
      await c.save()
    }
  }
}

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

// Protected routes - require authentication
router.get("/", auth(), async(req,res)=>{

await checkEscalation()

const cases = await Case.find()

res.json(cases)

})

router.get("/new", auth(), async(req,res)=>{

await checkEscalation()

const cases = await Case.find({status:"New"})

res.json(cases)

})


router.put("/assign/:id", auth(), async(req,res)=>{

try{
  const {managerId} = req.body

  const updated = await Case.findByIdAndUpdate(
    req.params.id,
    {
      assignedManager: managerId,
      status: "Assigned"
    },
    {new:true}
  )

  res.json(updated)
}catch(err){
  res.status(500).json(err)
}

})


router.get("/manager/:id", auth(), async(req,res)=>{

await checkEscalation()

const cases = await Case.find({
  assignedManager: req.params.id
})

res.json(cases)

})


router.put("/update/:id", auth(), async(req,res)=>{

try{
  const {status,notes} = req.body

  const updated = await Case.findByIdAndUpdate(
    req.params.id,
    {
      status,
      notes
    },
    {new:true}
  )

  res.json(updated)
}catch(err){
  res.status(500).json(err)
}

})

router.get("/impact", auth(), async(req,res)=>{

const resolved = await Case.find({
status:"Resolved"
})

res.json(resolved)

})

router.get("/analytics/departments", auth(), async (req,res)=>{

try{

const data = await Case.aggregate([
{
$group:{
_id:"$department",
count:{$sum:1}
}
}
])

res.json(data)

}catch(err){

res.status(500).json(err)

}

})

router.get("/analytics/hotspots", auth(), async (req,res)=>{

try{

const hotspots = await Case.aggregate([

{
$group:{
_id:{
department:"$department",
category:"$category"
},
count:{$sum:1}
}
},

{
$match:{
count:{ $gte:5 }
}
}

])

res.json(hotspots)

}catch(err){

res.status(500).json(err)

}

})

module.exports = router

